package com.booknest.payment.service;

import com.booknest.payment.config.VnPayConfig;
import com.booknest.payment.entity.GiaoDichThanhToan;
import com.booknest.payment.repository.GiaoDichThanhToanRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class PaymentService {

    private final GiaoDichThanhToanRepository repository;
    private final VnPayConfig vnPayConfig;

    public PaymentService(GiaoDichThanhToanRepository repository, VnPayConfig vnPayConfig) {
        this.repository = repository;
        this.vnPayConfig = vnPayConfig;
    }

    public GiaoDichThanhToan payByCod(Long orderId, BigDecimal amount) {
        GiaoDichThanhToan txn = new GiaoDichThanhToan();
        txn.setMaDonHang(orderId);
        txn.setCongThanhToan(GiaoDichThanhToan.CongThanhToan.COD);
        txn.setMaThamChieu(UUID.randomUUID().toString());
        txn.setSoTien(amount);
        txn.setTrangThai(GiaoDichThanhToan.TrangThaiGiaoDich.THANH_CONG);
        return repository.save(txn);
    }

    public String payByVnPay(Long orderId, BigDecimal amount) {
        GiaoDichThanhToan txn = new GiaoDichThanhToan();
        txn.setMaDonHang(orderId);
        txn.setCongThanhToan(GiaoDichThanhToan.CongThanhToan.VNPAY);
        txn.setMaThamChieu(UUID.randomUUID().toString());
        txn.setSoTien(amount);
        txn.setTrangThai(GiaoDichThanhToan.TrangThaiGiaoDich.KHOI_TAO);
        repository.save(txn);

        return vnPayConfig.getPayUrl() + "?vnp_TxnRef=" + txn.getMaThamChieu() +
                "&vnp_Amount=" + amount.multiply(BigDecimal.valueOf(100)).longValue() +
                "&vnp_ReturnUrl=" + vnPayConfig.getReturnUrl() +
                "&vnp_TmnCode=" + vnPayConfig.getTmnCode();
    }

    public void handleVnPayCallback(String txnRef, boolean success, String rawData) {
        repository.findByMaThamChieu(txnRef).ifPresent(txn -> {
            txn.setTrangThai(success ?
                    GiaoDichThanhToan.TrangThaiGiaoDich.THANH_CONG :
                    GiaoDichThanhToan.TrangThaiGiaoDich.THAT_BAI);
            txn.setDuLieuWebhook(rawData);
            repository.save(txn);
        });
    }
}
