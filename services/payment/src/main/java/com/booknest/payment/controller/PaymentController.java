package com.booknest.payment.controller;

import com.booknest.payment.dto.PaymentResponse;
import com.booknest.payment.service.PaymentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // POST /payments/create_payment_url
    @PostMapping("/create_payment_url")
    public PaymentResponse createPaymentUrl(@RequestBody Map<String, Object> body) {
        Long orderId = Long.valueOf(body.get("orderId").toString());
        Long amount = Long.valueOf(body.get("amount").toString());
        String bankCode = body.get("bankCode") != null ? body.get("bankCode").toString() : null;
        String language = body.getOrDefault("language", "vn").toString();

        return paymentService.createPaymentUrl(orderId, amount, bankCode, language);
    }

    // GET /payments/vnpay_return
    @GetMapping("/vnpay_return")
    public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> params) {
        System.out.println("=== VNPAY CALLBACK ===");
        System.out.println("Params raw: " + params);

        try {
            Object result = paymentService.vnpayReturn(params);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Internal Server Error",
                    "message", e.getMessage(),
                    "params", params));
        }
    }

    // GET /payments/vnpay_ipn
    @GetMapping("/vnpay_ipn")
    public Object vnpayIpn(@RequestParam Map<String, String> params) {
        return paymentService.vnpayIpn(params);
    }
}
