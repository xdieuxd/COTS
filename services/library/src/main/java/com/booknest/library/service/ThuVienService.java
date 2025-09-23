package com.booknest.library.service;

import com.booknest.library.entity.MucThuVien;
import com.booknest.library.repository.MucThuVienRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ThuVienService {

    private final MucThuVienRepository mucThuVienRepository;

    public ThuVienService(MucThuVienRepository mucThuVienRepository) {
        this.mucThuVienRepository = mucThuVienRepository;
    }

    @Transactional
    public MucThuVien addToLibrary(Long maNguoiDung, Long maSach, MucThuVien.LoaiMuc loaiMuc, boolean choPhepDocPdf) {
        if (mucThuVienRepository.existsByMaNguoiDungAndMaSachAndLoaiMuc(maNguoiDung, maSach, loaiMuc)) {
            return null; // đã tồn tại
        }
        MucThuVien muc = new MucThuVien();
        muc.setMaNguoiDung(maNguoiDung);
        muc.setMaSach(maSach);
        muc.setLoaiMuc(loaiMuc);
        muc.setChoPhepDocPdf(choPhepDocPdf);
        return mucThuVienRepository.save(muc);
    }

    public List<MucThuVien> getLibraryByUser(Long maNguoiDung) {
        return mucThuVienRepository.findByMaNguoiDung(maNguoiDung);
    }
}
