package com.booknest.order.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "chi_tiet_gio_hang")
public class ChiTietGioHang {

    @EmbeddedId
    private ChiTietGioHangId id;

    @ManyToOne
    @MapsId("maGioHang")
    @JoinColumn(name = "ma_gio_hang")
    private GioHang gioHang;

    @Column(nullable = false)
    private Integer soLuong;

    @Column(nullable = false, name = "gia_ban")
    private BigDecimal giaBan;

    // ================== GETTERS & SETTERS ==================
    public ChiTietGioHangId getId() {
        return id;
    }

    public void setId(ChiTietGioHangId id) {
        this.id = id;
    }

    public GioHang getGioHang() {
        return gioHang;
    }

    public void setGioHang(GioHang gioHang) {
        this.gioHang = gioHang;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public BigDecimal getGiaBan() {
        return giaBan;
    }

    public void setGiaBan(BigDecimal giaBan) {
        this.giaBan = giaBan;
    }

    // lấy maSach từ EmbeddedId
    public Long getMaSach() {
        return id != null ? id.getMaSach() : null;
    }

    public void setMaSach(Long maSach) {
        if (id == null)
            id = new ChiTietGioHangId();
        id.setMaSach(maSach);
    }
}
