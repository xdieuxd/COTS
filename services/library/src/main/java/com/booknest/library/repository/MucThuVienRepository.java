package com.booknest.library.repository;

import com.booknest.library.entity.MucThuVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MucThuVienRepository extends JpaRepository<MucThuVien, Long> {
    List<MucThuVien> findByMaNguoiDung(Long maNguoiDung);
    boolean existsByMaNguoiDungAndMaSachAndLoaiMuc(Long maNguoiDung, Long maSach, MucThuVien.LoaiMuc loaiMuc);
}
