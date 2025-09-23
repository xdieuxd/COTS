package com.booknest.library.scheduler;

import com.booknest.library.entity.MucThuVien;
import com.booknest.library.service.ThuVienService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OutboxScheduler {

    private final ThuVienService thuVienService;

    public OutboxScheduler(ThuVienService thuVienService) {
        this.thuVienService = thuVienService;
    }

    // Mỗi 10 giây quét outbox (ví dụ nhận event ORDER_PAID)
    @Scheduled(fixedDelay = 10000)
    public void processOrderPaidEvents() {
        // TODO: gọi API/order outbox service để lấy các đơn hàng vừa thanh toán
        // ví dụ mock:
        Long maNguoiDung = 1L;
        Long maSach = 101L;
        thuVienService.addToLibrary(maNguoiDung, maSach, MucThuVien.LoaiMuc.DA_MUA, true);
    }
}
