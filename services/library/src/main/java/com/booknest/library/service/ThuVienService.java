package com.booknest.library.service;

import com.booknest.library.entity.MucThuVien;
import com.booknest.library.repository.MucThuVienRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ThuVienService {

    private final MucThuVienRepository mucThuVienRepository;

    public ThuVienService(MucThuVienRepository mucThuVienRepository) {
        this.mucThuVienRepository = mucThuVienRepository;
    }

    // --- Thêm mới ---
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

    // --- Lấy danh sách theo người dùng ---
    public List<MucThuVien> getLibraryByUser(Long maNguoiDung) {
        return mucThuVienRepository.findByMaNguoiDung(maNguoiDung);
    }

    // --- Cập nhật ---
    @Transactional
    public MucThuVien updateLibrary(Long maNguoiDung, Long maSach, MucThuVien.LoaiMuc loaiMuc, boolean choPhepDocPdf) {
        Optional<MucThuVien> optional = mucThuVienRepository.findByMaNguoiDungAndMaSachAndLoaiMuc(maNguoiDung, maSach,
                loaiMuc);
        if (optional.isPresent()) {
            MucThuVien muc = optional.get();
            muc.setChoPhepDocPdf(choPhepDocPdf);
            return mucThuVienRepository.save(muc);
        }
        return null; // không tìm thấy
    }

    // --- Xóa ---
    @Transactional
    public boolean deleteLibrary(Long maNguoiDung, Long maSach, MucThuVien.LoaiMuc loaiMuc) {
        Optional<MucThuVien> optional = mucThuVienRepository.findByMaNguoiDungAndMaSachAndLoaiMuc(maNguoiDung, maSach,
                loaiMuc);
        if (optional.isPresent()) {
            mucThuVienRepository.delete(optional.get());
            return true;
        }
        return false; // không tìm thấy
    }
}
