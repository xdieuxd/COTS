package com.booknest.payment.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "giao_dich_thanh_toan")
public class GiaoDichThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maGiaoDich;

    @Column(nullable = false)
    private Long maDonHang;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CongThanhToan congThanhToan;

    @Column(nullable = false, unique = true)
    private String maThamChieu; // txnRef

    @Column(nullable = false)
    private BigDecimal soTien;

    @Enumerated(EnumType.STRING)
    private TrangThaiGiaoDich trangThai = TrangThaiGiaoDich.KHOI_TAO;

    @Column(columnDefinition = "json")
    private String duLieuWebhook;

    private LocalDateTime ngayTao = LocalDateTime.now();

    // standard getters and setters...

    public enum CongThanhToan { MOCK, MOMO, PAYPAL, VNPAY, COD }
    public enum TrangThaiGiaoDich { KHOI_TAO, THANH_CONG, THAT_BAI }

    // getters & setters
    public Long getMaGiaoDich() { return maGiaoDich; }
    public void setMaGiaoDich(Long maGiaoDich) { this.maGiaoDich = maGiaoDich; }

    public Long getMaDonHang() { return maDonHang; }
    public void setMaDonHang(Long maDonHang) { this.maDonHang = maDonHang; }

    public CongThanhToan getCongThanhToan() { return congThanhToan; }
    public void setCongThanhToan(CongThanhToan congThanhToan) { this.congThanhToan = congThanhToan; }

    public String getMaThamChieu() { return maThamChieu; }
    public void setMaThamChieu(String maThamChieu) { this.maThamChieu = maThamChieu; }

    public BigDecimal getSoTien() { return soTien; }
    public void setSoTien(BigDecimal soTien) { this.soTien = soTien; }

    public TrangThaiGiaoDich getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiGiaoDich trangThai) { this.trangThai = trangThai; }

    public String getDuLieuWebhook() { return duLieuWebhook; }
    public void setDuLieuWebhook(String duLieuWebhook) { this.duLieuWebhook = duLieuWebhook; }

    public LocalDateTime getNgayTao() { return ngayTao; }
    public void setNgayTao(LocalDateTime ngayTao) { this.ngayTao = ngayTao; }
}
