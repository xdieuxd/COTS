package com.booknest.payment.dto;

public class PaymentResponse {
    private String message;
    private String status;
    private String data;

    public PaymentResponse(String message, String status, String data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public String getStatus() {
        return status;
    }

    public String getData() {
        return data;
    }
}
