package com.booknest.order.controller;

import com.booknest.order.dto.DonHangUpdateDto;
import com.booknest.order.entity.DonHang;
import com.booknest.order.service.DonHangService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class DonHangController {

    private final DonHangService donHangService;

    public DonHangController(DonHangService donHangService) {
        this.donHangService = donHangService;
    }

    // ====================== CREATE ======================
    @PostMapping
    public ResponseEntity<DonHang> createOrder(@RequestBody DonHang donHang) {
        DonHang createdOrder = donHangService.createOrder(donHang);
        return ResponseEntity.ok(createdOrder);
    }

    // ====================== READ ALL ======================
    @GetMapping
    public ResponseEntity<List<DonHang>> getAllOrders() {
        List<DonHang> orders = donHangService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // ====================== READ ONE ======================
    @GetMapping("/{id}")
    public ResponseEntity<DonHang> getOrder(@PathVariable Long id) {
        DonHang order = donHangService.getOrderById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    // ====================== UPDATE ======================
    @PutMapping("/{id}")
    public ResponseEntity<DonHang> updateOrder(
            @PathVariable Long id,
            @RequestBody DonHangUpdateDto dto) {

        // Lấy đơn hàng hiện tại
        DonHang existingOrder = donHangService.getOrderById(id);
        if (existingOrder == null) {
            return ResponseEntity.notFound().build();
        }

        // Cập nhật các trường từ DTO
        existingOrder.setMaNguoiDung(dto.getMaNguoiDung());
        existingOrder.setTenNguoiNhan(dto.getTenNguoiNhan());
        existingOrder.setTongTien(dto.getTongTien());
        existingOrder.setPhuongThucThanhToan(dto.getPhuongThucThanhToan());

        // Lưu lại
        DonHang updatedOrder = donHangService.updateOrder(existingOrder);
        return ResponseEntity.ok(updatedOrder);
    }

    // ====================== DELETE ======================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        boolean deleted = donHangService.deleteOrder(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
