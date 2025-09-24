package com.booknest.payment.service;

import com.booknest.payment.config.VnPayConfig;
import com.booknest.payment.dto.PaymentResponse;
import com.booknest.payment.entity.GiaoDichThanhToan;
import com.booknest.payment.repository.GiaoDichThanhToanRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentService {

    private final GiaoDichThanhToanRepository repository;
    private final VnPayConfig vnPayConfig;

    public PaymentService(GiaoDichThanhToanRepository repository, VnPayConfig vnPayConfig) {
        this.repository = repository;
        this.vnPayConfig = vnPayConfig;
    }

    // ===================== COD Payment =====================
    public GiaoDichThanhToan payByCod(Long orderId, BigDecimal amount) {
        GiaoDichThanhToan txn = new GiaoDichThanhToan();
        txn.setMaDonHang(orderId);
        txn.setCongThanhToan(GiaoDichThanhToan.CongThanhToan.COD);
        txn.setMaThamChieu(UUID.randomUUID().toString());
        txn.setSoTien(amount);
        txn.setTrangThai(GiaoDichThanhToan.TrangThaiGiaoDich.THANH_CONG);
        return repository.save(txn);
    }

    // ===================== Create Payment URL =====================
    public PaymentResponse createPaymentUrl(Long orderId, Long amount, String bankCode, String language) {
        String orderRef = LocalDateTime.now().format(DateTimeFormatter.ofPattern("ddHHmmss"));

        Map<String, String> params = new HashMap<>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", vnPayConfig.getTmnCode());
        params.put("vnp_Amount", String.valueOf(amount * 100));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", orderRef);
        params.put("vnp_OrderInfo", "Thanh toan cho ma GD:" + orderRef);
        params.put("vnp_OrderType", "other");
        params.put("vnp_Locale", language != null ? language : "vn");
        params.put("vnp_ReturnUrl", vnPayConfig.getReturnUrl());
        params.put("vnp_IpAddr", "127.0.0.1");
        params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
        if (bankCode != null && !bankCode.isEmpty()) {
            params.put("vnp_BankCode", bankCode);
        }

        String paymentUrl = vnPayConfig.getPayUrl() + "?" + buildQueryAndSign(params, vnPayConfig.getSecretKey());
        return new PaymentResponse("Tạo payment url thành công", "00", paymentUrl);
    }

    // ===================== vnpayReturn =====================

    public Object vnpayReturn(Map<String, String> params) {
        Logger log = LoggerFactory.getLogger(getClass());

        // Lấy secure hash từ VNPay trả về
        String vnpSecureHash = params.get("vnp_SecureHash");

        // Tạo bản copy để xử lý
        Map<String, String> paramsCopy = new HashMap<>(params);
        paramsCopy.remove("vnp_SecureHash");
        paramsCopy.remove("vnp_SecureHashType");

        // Sort key alphabet
        List<String> fieldNames = new ArrayList<>(paramsCopy.keySet());
        Collections.sort(fieldNames);

        // Build hashData theo đúng format của VNPay
        StringBuilder hashData = new StringBuilder();
        for (int i = 0; i < fieldNames.size(); i++) {
            String fieldName = fieldNames.get(i);
            String fieldValue = paramsCopy.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                try {
                    hashData.append(fieldName).append("=")
                            .append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
                } catch (Exception e) {
                    log.error("Lỗi encode UTF-8: {}", e.getMessage());
                }
                if (i < fieldNames.size() - 1) {
                    hashData.append("&");
                }
            }
        }

        // Ký lại bằng HMAC SHA512
        String signed;
        try {
            signed = hmacSHA512(vnPayConfig.getSecretKey(), hashData.toString());
        } catch (Exception e) {
            log.error("Lỗi khi ký HMAC: {}", e.getMessage(), e);
            return Map.of("RspCode", "99", "Message", "Hash error: " + e.getMessage());
        }

        // Log debug để đối chiếu
        log.info("=== VNPAY RETURN DEBUG ===");
        log.info("HashData build   : {}", hashData);
        log.info("SecureHash local : {}", signed);
        log.info("SecureHash vnpay : {}", vnpSecureHash);

        // So sánh chữ ký
        if (!signed.equalsIgnoreCase(vnpSecureHash)) {
            return Map.of(
                    "RspCode", "97",
                    "Message", "Sai chữ ký",
                    "hashData", hashData.toString(),
                    "signedByApp", signed,
                    "signedByVnpay", vnpSecureHash);
        }

        // Xử lý kết quả giao dịch
        String responseCode = params.get("vnp_ResponseCode");
        boolean success = "00".equals(responseCode);

        return Map.of(
                "RspCode", "00",
                "Message", success ? "Giao dịch thành công" : "Giao dịch thất bại",
                "transactionInfo", params);
    }

    // ===================== vnpayIPN =====================
    public Object vnpayIpn(Map<String, String> params) {
        String vnpSecureHash = params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        String signed = buildHashData(params, vnPayConfig.getSecretKey());
        if (!signed.equalsIgnoreCase(vnpSecureHash)) {
            return Map.of("RspCode", "97", "Message", "Chữ ký không hợp lệ");
        }

        String rspCode = params.get("vnp_ResponseCode");
        return Map.of("RspCode", "00", "Message", rspCode.equals("00") ? "Giao dịch thành công" : "Giao dịch thất bại");
    }

    // ===================== Helper =====================
    private String buildQueryAndSign(Map<String, String> params, String secretKey) {
        try {
            List<String> fieldNames = new ArrayList<>(params.keySet());
            Collections.sort(fieldNames);

            StringBuilder query = new StringBuilder();
            StringBuilder hashData = new StringBuilder();

            for (String fieldName : fieldNames) {
                String value = params.get(fieldName);
                if (value != null && !value.isEmpty()) {
                    query.append(fieldName).append("=")
                            .append(URLEncoder.encode(value, StandardCharsets.UTF_8)).append("&");
                    hashData.append(fieldName).append("=").append(value).append("&");
                }
            }
            query.setLength(query.length() - 1);
            hashData.setLength(hashData.length() - 1);

            String secureHash = hmacSHA512(secretKey, hashData.toString());
            return query + "&vnp_SecureHash=" + secureHash;
        } catch (Exception e) {
            throw new RuntimeException("Error while building VNPAY query", e);
        }
    }

    private String buildHashData(Map<String, String> params, String secretKey) {
        try {
            List<String> fieldNames = new ArrayList<>(params.keySet());
            Collections.sort(fieldNames);

            StringBuilder hashData = new StringBuilder();
            for (int i = 0; i < fieldNames.size(); i++) {
                String fieldName = fieldNames.get(i);
                String fieldValue = params.get(fieldName);
                if (fieldValue != null && !fieldValue.isEmpty()) {
                    hashData.append(fieldName).append("=").append(fieldValue);
                    if (i < fieldNames.size() - 1) {
                        hashData.append("&");
                    }
                }
            }
            return hmacSHA512(secretKey, hashData.toString());
        } catch (Exception e) {
            throw new RuntimeException("Error while building hash data", e);
        }
    }

    private String hmacSHA512(String key, String data) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmac.init(secretKey);
        byte[] bytes = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));

        StringBuilder hash = new StringBuilder();
        for (byte b : bytes) {
            hash.append(String.format("%02x", b));
        }
        return hash.toString();
    }
}
