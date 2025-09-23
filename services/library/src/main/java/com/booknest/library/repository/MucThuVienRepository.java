package com.booknest.library.repository;

import com.booknest.library.entity.MucThuVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MucThuVienRepository extends JpaRepository<MucThuVien, Long> {

    List<MucThuVien> findByMaNguoiDung(Long maNguoiDung);

    boolean existsByMaNguoiDungAndMaSachAndLoaiMuc(Long maNguoiDung, Long maSach, MucThuVien.LoaiMuc loaiMuc);

    // Thêm các method cần thiết cho update và delete
    Optional<MucThuVien> findByMaNguoiDungAndMaSachAndLoaiMuc(Long maNguoiDung, Long maSach,
            MucThuVien.LoaiMuc loaiMuc);
}
