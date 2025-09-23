package com.booknest.order.repository;

import com.booknest.order.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GioHangRepository extends JpaRepository<GioHang, Long> {
    GioHang findByMaNguoiDung(Long maNguoiDung);
}
