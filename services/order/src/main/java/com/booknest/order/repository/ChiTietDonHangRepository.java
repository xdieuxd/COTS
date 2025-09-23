package com.booknest.order.repository;

import com.booknest.order.entity.ChiTietDonHang;
import com.booknest.order.entity.ChiTietDonHangId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, ChiTietDonHangId> { }
