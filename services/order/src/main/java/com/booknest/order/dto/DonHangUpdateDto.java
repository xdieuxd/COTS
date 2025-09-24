package com.booknest.order.dto;

import com.booknest.order.entity.DonHang;

import java.math.BigDecimal;

public class DonHangUpdateDto {

    private Long maNguoiDung;
    private String tenNguoiNhan;
    private BigDecimal tongTien;
    private DonHang.PhuongThucThanhToan phuongThucThanhToan;

    // ====================== GETTERS & SETTERS ======================
    public Long getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(Long maNguoiDung) {
        this.maNguoiDung = maNguoiDung;
    }

    public String getTenNguoiNhan() {
        return tenNguoiNhan;
    }

    public void setTenNguoiNhan(String tenNguoiNhan) {
        this.tenNguoiNhan = tenNguoiNhan;
    }

    public BigDecimal getTongTien() {
        return tongTien;
    }

    public void setTongTien(BigDecimal tongTien) {
        this.tongTien = tongTien;
    }

    public DonHang.PhuongThucThanhToan getPhuongThucThanhToan() {
        return phuongThucThanhToan;
    }

    public void setPhuongThucThanhToan(DonHang.PhuongThucThanhToan phuongThucThanhToan) {
        this.phuongThucThanhToan = phuongThucThanhToan;
    }
}
