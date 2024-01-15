-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-12-08 14:54
-- 서버 버전: 8.0.35
-- PHP 버전: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `gksmf519`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `innisfree_admin_table`
--

CREATE TABLE `innisfree_admin_table` (
  `adminName` varchar(50) NOT NULL,
  `adminHp` varchar(13) NOT NULL,
  `adminBirth` varchar(10) NOT NULL,
  `adminId` varchar(16) NOT NULL,
  `adminPw` varchar(16) NOT NULL,
  `adminEmail` varchar(250) NOT NULL,
  `adminAddress` varchar(250) NOT NULL,
  `adminSignInDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `innisfree_admin_table`
--

INSERT INTO `innisfree_admin_table` (`adminName`, `adminHp`, `adminBirth`, `adminId`, `adminPw`, `adminEmail`, `adminAddress`, `adminSignInDate`) VALUES
('', '', '', '', '', '', '', '2023-12-08 05:54:22');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `innisfree_admin_table`
--
ALTER TABLE `innisfree_admin_table`
  ADD PRIMARY KEY (`adminId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
