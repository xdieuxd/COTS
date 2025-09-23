package com.booknest.order.service;

import com.booknest.order.entity.DonHang;
import com.booknest.order.repository.DonHangRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class DonHangService {

    private final DonHangRepository donHangRepository;

    public DonHangService(DonHangRepository donHangRepository) {
        this.donHangRepository = donHangRepository;
    }

    @Transactional
    public DonHang createOrder(DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    public List<DonHang> getAllOrders() {
        return donHangRepository.findAll();
    }

    public DonHang getOrderById(Long id) {
        return donHangRepository.findById(id).orElse(null);
    }

    @Transactional
    public DonHang updateOrder(DonHang donHang) {
        return donHangRepository.save(donHang);
    }
}
