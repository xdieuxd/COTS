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

    @GetMapping("/{maNguoiDung}")
    public ResponseEntity<List<MucThuVien>> getLibrary(@PathVariable Long maNguoiDung) {
        List<MucThuVien> list = thuVienService.getLibraryByUser(maNguoiDung);
        return ResponseEntity.ok(list);
    }
}
