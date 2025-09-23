package com.booknest.library.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "muc_thu_vien")
public class MucThuVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // tương ứng cột id bigint auto_increment

    @Column(name = "ma_nguoi_dung", nullable = false)
    private Long maNguoiDung;

    @Column(name = "ma_sach", nullable = false)
    private Long maSach;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_muc", nullable = false)
    private LoaiMuc loaiMuc;

    @Column(name = "cho_phep_doc_pdf", nullable = false)
    private Boolean choPhepDocPdf = false;

    @Column(name = "ngay_them", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime ngayThem;

    public enum LoaiMuc {
        DA_MUA, YEU_THICH
    }

    // --- Getters và Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(Long maNguoiDung) {
        this.maNguoiDung = maNguoiDung;
    }

    public Long getMaSach() {
        return maSach;
    }

    public void setMaSach(Long maSach) {
        this.maSach = maSach;
    }

    public LoaiMuc getLoaiMuc() {
        return loaiMuc;
    }

    public void setLoaiMuc(LoaiMuc loaiMuc) {
        this.loaiMuc = loaiMuc;
    }

    public Boolean getChoPhepDocPdf() {
        return choPhepDocPdf;
    }

    public void setChoPhepDocPdf(Boolean choPhepDocPdf) {
        this.choPhepDocPdf = choPhepDocPdf;
    }

    public LocalDateTime getNgayThem() {
        return ngayThem;
    }

    public void setNgayThem(LocalDateTime ngayThem) {
        this.ngayThem = ngayThem;
    }
}
