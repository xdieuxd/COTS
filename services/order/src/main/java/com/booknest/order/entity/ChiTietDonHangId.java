package com.booknest.order.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChiTietDonHangId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long maDonHang;
    private Long maSach;

    public ChiTietDonHangId() {
    }

    public ChiTietDonHangId(Long maDonHang, Long maSach) {
        this.maDonHang = maDonHang;
        this.maSach = maSach;
    }

    // ====================== GETTERS & SETTERS ======================
    public Long getMaDonHang() {
        return maDonHang;
    }

    public void setMaDonHang(Long maDonHang) {
        this.maDonHang = maDonHang;
    }

    public Long getMaSach() {
        return maSach;
    }

    public void setMaSach(Long maSach) {
        this.maSach = maSach;
    }

    // ====================== EQUALS & HASHCODE ======================
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ChiTietDonHangId that = (ChiTietDonHangId) o;
        return Objects.equals(maDonHang, that.maDonHang) &&
                Objects.equals(maSach, that.maSach);
    }

    @Override
    public int hashCode() {
        return Objects.hash(maDonHang, maSach);
    }
}
