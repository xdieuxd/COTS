package com.booknest.order.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "gio_hang")
public class GioHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maGioHang;

    @Column(nullable = false, unique = true)
    private Long maNguoiDung;

    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToMany(mappedBy = "gioHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietDonHang> chiTietGioHangs;

    // getters & setters
    public Long getMaGioHang() {
        return maGioHang;
    }

    public void setMaGioHang(Long maGioHang) {
        this.maGioHang = maGioHang;
    }

    public Long getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(Long maNguoiDung) {
        this.maNguoiDung = maNguoiDung;
    }

    public LocalDateTime getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(LocalDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public List<ChiTietDonHang> getChiTietGioHangs() {
        return chiTietGioHangs;
    }

    public void setChiTietGioHangs(List<ChiTietDonHang> chiTietGioHangs) {
        this.chiTietGioHangs = chiTietGioHangs;
    }
}
