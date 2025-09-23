package com.booknest.order.controller;

import com.booknest.order.entity.DonHang;
import com.booknest.order.service.DonHangService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class DonHangController {

    private final DonHangService donHangService;

    public DonHangController(DonHangService donHangService) {
        this.donHangService = donHangService;
    }

    @PostMapping
    public DonHang createOrder(@RequestBody DonHang donHang) {
        return donHangService.createOrder(donHang);
    }

    @GetMapping
    public List<DonHang> getAllOrders() {
        return donHangService.getAllOrders();
    }

    @GetMapping("/{id}")
    public DonHang getOrder(@PathVariable Long id) {
        return donHangService.getOrderById(id);
    }

    @PutMapping("/{id}")
    public DonHang updateOrder(@PathVariable Long id, @RequestBody DonHang donHang) {
        donHang.setMaDonHang(id);
        return donHangService.updateOrder(donHang);
    }
}
