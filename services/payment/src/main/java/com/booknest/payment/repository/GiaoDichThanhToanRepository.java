package com.booknest.payment.repository;

import com.booknest.payment.entity.GiaoDichThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GiaoDichThanhToanRepository extends JpaRepository<GiaoDichThanhToan, Long> {
    Optional<GiaoDichThanhToan> findByMaThamChieu(String maThamChieu);
}
