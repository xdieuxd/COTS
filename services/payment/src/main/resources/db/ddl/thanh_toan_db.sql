CREATE DATABASE IF NOT EXISTS thanh_toan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci;
USE thanh_toan_db;

CREATE TABLE giao_dich_thanh_toan (
  ma_giao_dich BIGINT PRIMARY KEY AUTO_INCREMENT,
  ma_don_hang BIGINT NOT NULL,
  cong_thanh_toan ENUM('MOCK','VNPAY') NOT NULL,
  ma_tham_chieu VARCHAR(100) NOT NULL UNIQUE, -- txnRef
  so_tien DECIMAL(12,2) NOT NULL,
  trang_thai ENUM('KHOI_TAO','THANH_CONG','THAT_BAI') DEFAULT 'KHOI_TAO',
  du_lieu_webhook JSON,
  ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
