package com.booknest.order.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "don_hang")
public class DonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maDonHang;

    @Column(nullable = false)
    private Long maNguoiDung;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiDonHang trangThai = TrangThaiDonHang.TAO_MOI;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PhuongThucThanhToan phuongThucThanhToan;

    @Column(nullable = false)
    private BigDecimal tongTien;

    private String tenNguoiNhan;
    private String sdtNguoiNhan;
    private String diaChiNhan;
    private String maThamChieuThanhToan;

    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietDonHang> chiTietDonHangs;

    // ====================== GETTERS & SETTERS ======================
    public Long getMaDonHang() { return maDonHang; }
    public void setMaDonHang(Long maDonHang) { this.maDonHang = maDonHang; }

    public Long getMaNguoiDung() { return maNguoiDung; }
    public void setMaNguoiDung(Long maNguoiDung) { this.maNguoiDung = maNguoiDung; }

    public TrangThaiDonHang getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiDonHang trangThai) { this.trangThai = trangThai; }

    public PhuongThucThanhToan getPhuongThucThanhToan() { return phuongThucThanhToan; }
    public void setPhuongThucThanhToan(PhuongThucThanhToan phuongThucThanhToan) { this.phuongThucThanhToan = phuongThucThanhToan; }

    public BigDecimal getTongTien() { return tongTien; }
    public void setTongTien(BigDecimal tongTien) { this.tongTien = tongTien; }

    public String getTenNguoiNhan() { return tenNguoiNhan; }
    public void setTenNguoiNhan(String tenNguoiNhan) { this.tenNguoiNhan = tenNguoiNhan; }

    public String getSdtNguoiNhan() { return sdtNguoiNhan; }
    public void setSdtNguoiNhan(String sdtNguoiNhan) { this.sdtNguoiNhan = sdtNguoiNhan; }

    public String getDiaChiNhan() { return diaChiNhan; }
    public void setDiaChiNhan(String diaChiNhan) { this.diaChiNhan = diaChiNhan; }

    public String getMaThamChieuThanhToan() { return maThamChieuThanhToan; }
    public void setMaThamChieuThanhToan(String maThamChieuThanhToan) { this.maThamChieuThanhToan = maThamChieuThanhToan; }

    public LocalDateTime getNgayTao() { return ngayTao; }
    public void setNgayTao(LocalDateTime ngayTao) { this.ngayTao = ngayTao; }

    public List<ChiTietDonHang> getChiTietDonHangs() { return chiTietDonHangs; }
    public void setChiTietDonHangs(List<ChiTietDonHang> chiTietDonHangs) { this.chiTietDonHangs = chiTietDonHangs; }

    // ====================== ENUM ======================
    public enum TrangThaiDonHang {
        TAO_MOI, DA_THANH_TOAN, DANG_GIAO, DA_NHAN, DA_HUY, HOAN_TIEN
    }

    public enum PhuongThucThanhToan {
        ONLINE, COD, VNPAY
    }
}
