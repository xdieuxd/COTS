package com.booknest.library.controller;

import com.booknest.library.entity.MucThuVien;
import com.booknest.library.service.ThuVienService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class ThuVienController {

    private final ThuVienService thuVienService;

    public ThuVienController(ThuVienService thuVienService) {
        this.thuVienService = thuVienService;
    }

    // Thêm vào thư viện
    @PostMapping("/add")
    public ResponseEntity<MucThuVien> addToLibrary(
            @RequestParam Long maNguoiDung,
            @RequestParam Long maSach,
            @RequestParam MucThuVien.LoaiMuc loaiMuc,
            @RequestParam(defaultValue = "false") boolean choPhepDocPdf) {
        MucThuVien muc = thuVienService.addToLibrary(maNguoiDung, maSach, loaiMuc, choPhepDocPdf);
        if (muc == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(muc);
    }

    // Lấy danh sách thư viện của người dùng
    @GetMapping("/{maNguoiDung}")
    public ResponseEntity<List<MucThuVien>> getLibrary(@PathVariable Long maNguoiDung) {
        List<MucThuVien> list = thuVienService.getLibraryByUser(maNguoiDung);
        return ResponseEntity.ok(list);
    }

    // Cập nhật entry trong thư viện
    @PutMapping("/update")
    public ResponseEntity<MucThuVien> updateLibrary(
            @RequestParam Long maNguoiDung,
            @RequestParam Long maSach,
            @RequestParam MucThuVien.LoaiMuc loaiMuc,
            @RequestParam boolean choPhepDocPdf) {
        MucThuVien updated = thuVienService.updateLibrary(maNguoiDung, maSach, loaiMuc, choPhepDocPdf);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Xóa entry trong thư viện
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteLibrary(
            @RequestParam Long maNguoiDung,
            @RequestParam Long maSach,
            @RequestParam MucThuVien.LoaiMuc loaiMuc) {
        boolean deleted = thuVienService.deleteLibrary(maNguoiDung, maSach, loaiMuc);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
