CREATE DATABASE IF NOT EXISTS don_hang_db CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci;
USE don_hang_db;

CREATE TABLE gio_hang (
  ma_gio_hang BIGINT PRIMARY KEY AUTO_INCREMENT,
  ma_nguoi_dung BIGINT NOT NULL,
  ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_gio_hang_user (ma_nguoi_dung)
);

CREATE TABLE chi_tiet_gio_hang (
  ma_gio_hang BIGINT NOT NULL,
  ma_sach BIGINT NOT NULL,
  so_luong INT NOT NULL CHECK (so_luong > 0),
  gia_ban DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (ma_gio_hang, ma_sach),
  FOREIGN KEY (ma_gio_hang) REFERENCES gio_hang(ma_gio_hang)
);

CREATE TABLE don_hang (
  ma_don_hang BIGINT PRIMARY KEY AUTO_INCREMENT,
  ma_nguoi_dung BIGINT NOT NULL,
  trang_thai ENUM('TAO_MOI','DA_THANH_TOAN','DANG_GIAO','DA_NHAN','DA_HUY','HOAN_TIEN') DEFAULT 'TAO_MOI',
  phuong_thuc_thanh_toan ENUM('COD','VNPAY') NOT NULL,
  tong_tien DECIMAL(12,2) NOT NULL,
  ten_nguoi_nhan VARCHAR(150),
  sdt_nguoi_nhan VARCHAR(20),
  dia_chi_nhan VARCHAR(300),
  ma_tham_chieu_thanh_toan VARCHAR(100) UNIQUE,
  ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chi_tiet_don_hang (
  ma_don_hang BIGINT NOT NULL,
  ma_sach BIGINT NOT NULL,
  so_luong INT NOT NULL CHECK (so_luong > 0),
  don_gia DECIMAL(12,2) NOT NULL,
  loai_sach ENUM('GIAY','PDF') NOT NULL,
  PRIMARY KEY (ma_don_hang, ma_sach),
  FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang)
);

CREATE TABLE hoa_don (
  ma_hoa_don BIGINT PRIMARY KEY AUTO_INCREMENT,
  ma_don_hang BIGINT NOT NULL,
  so_tien DECIMAL(12,2) NOT NULL,
  trang_thai_thanh_toan ENUM('CHUA_TT','DA_TT') DEFAULT 'CHUA_TT',
  ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang)
);

CREATE TABLE su_kien_cho (
  ma_su_kien BIGINT PRIMARY KEY AUTO_INCREMENT,
  loai_su_kien VARCHAR(64) NOT NULL, -- ORDER_CREATED/PAID/RECEIVED
  noi_dung_json JSON NOT NULL,
  trang_thai ENUM('MOI','DA_GUI','THAT_BAI') DEFAULT 'MOI',
  ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ngay_gui TIMESTAMP NULL
);
