package com.booknest.order.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang {

    @EmbeddedId
    private ChiTietDonHangId id;

    @ManyToOne
    @MapsId("maDonHang")
    @JoinColumn(name = "ma_don_hang")
    private DonHang donHang;

    @Column(nullable = false)
    private Long maSach;

    @Column(nullable = false)
    private Integer soLuong;

    @Column(nullable = false)
    private BigDecimal donGia;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiSach loaiSach;

    // ====================== GETTERS & SETTERS ======================
    public ChiTietDonHangId getId() { return id; }
    public void setId(ChiTietDonHangId id) { this.id = id; }

    public DonHang getDonHang() { return donHang; }
    public void setDonHang(DonHang donHang) { this.donHang = donHang; }

    public Long getMaSach() { return maSach; }
    public void setMaSach(Long maSach) { this.maSach = maSach; }

    public Integer getSoLuong() { return soLuong; }
    public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }

    public BigDecimal getDonGia() { return donGia; }
    public void setDonGia(BigDecimal donGia) { this.donGia = donGia; }

    public LoaiSach getLoaiSach() { return loaiSach; }
    public void setLoaiSach(LoaiSach loaiSach) { this.loaiSach = loaiSach; }

    public enum LoaiSach {
        GIAY, PDF
    }
}
