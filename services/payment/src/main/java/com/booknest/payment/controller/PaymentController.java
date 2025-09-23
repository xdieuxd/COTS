package com.booknest.payment.controller;

import com.booknest.payment.entity.GiaoDichThanhToan;
import com.booknest.payment.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/cod")
    public GiaoDichThanhToan payByCod(@RequestBody Map<String, String> body) {
        Long orderId = Long.parseLong(body.get("orderId"));
        BigDecimal amount = new BigDecimal(body.get("amount"));
        return paymentService.payByCod(orderId, amount);
    }

    @PostMapping("/vnpay")
    public String payByVnPay(@RequestBody Map<String, String> body) {
        Long orderId = Long.parseLong(body.get("orderId"));
        BigDecimal amount = new BigDecimal(body.get("amount"));
        return paymentService.payByVnPay(orderId, amount);
    }

    @PostMapping("/vnpay/callback")
    public void vnPayCallback(@RequestBody Map<String, String> body) {
        String txnRef = body.get("vnp_TxnRef");
        boolean success = "00".equals(body.get("vnp_ResponseCode"));
        paymentService.handleVnPayCallback(txnRef, success, body.toString());
    }
}
