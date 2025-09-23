CREATE DATABASE IF NOT EXISTS thu_vien_db CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci;
USE thu_vien_db;

CREATE TABLE muc_thu_vien (
  ma_nguoi_dung BIGINT NOT NULL,
  ma_sach BIGINT NOT NULL,
  loai_muc ENUM('DA_MUA','YEU_THICH') NOT NULL,
  cho_phep_doc_pdf BOOLEAN NOT NULL DEFAULT FALSE,
  ngay_them TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ma_nguoi_dung, ma_sach, loai_muc)
);
