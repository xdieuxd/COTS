package com.booknest.order.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChiTietGioHangId implements Serializable {

    private Long maGioHang;
    private Long maSach;

    // ================== GETTERS & SETTERS ==================
    public Long getMaGioHang() {
        return maGioHang;
    }

    public void setMaGioHang(Long maGioHang) {
        this.maGioHang = maGioHang;
    }

    public Long getMaSach() {
        return maSach;
    }

    public void setMaSach(Long maSach) {
        this.maSach = maSach;
    }

    // ================== equals & hashCode ==================
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof ChiTietGioHangId))
            return false;
        ChiTietGioHangId that = (ChiTietGioHangId) o;
        return Objects.equals(maGioHang, that.maGioHang) &&
                Objects.equals(maSach, that.maSach);
    }

    @Override
    public int hashCode() {
        return Objects.hash(maGioHang, maSach);
    }
}
