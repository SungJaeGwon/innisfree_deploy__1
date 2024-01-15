-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-12-01 17:30
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
-- 테이블 구조 `innisfree_table`
--

CREATE TABLE `innisfree_table` (
  `userName` varchar(50) NOT NULL,
  `userHp` varchar(13) NOT NULL,
  `userBirth` varchar(10) NOT NULL,
  `userId` varchar(16) NOT NULL,
  `userPw` varchar(16) NOT NULL,
  `userSignInDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `innisfree_table`
--

INSERT INTO `innisfree_table` (`userName`, `userHp`, `userBirth`, `userId`, `userPw`, `userSignInDate`) VALUES
('고길동', '010-7554-7754', '1950', '05', '05', '2023-11-29 13:50:07'),
('둘리', '010-5554-1352', '1987', '03', '03', '2023-11-29 13:58:55'),
('도우너', '010-1254-8852', '1967', '04', '12', '2023-11-29 14:04:41'),
('권성재', '010-9965-4607', '1994.09.12', 'dooly12', 'dooly12345', '2023-12-01 04:29:24'),
('경민주', '010-5967-4562', '1994.09.12', 'ming1212', 'ming0303!@', '2023-12-01 04:30:12'),
('마초', '010-4567-4567', '1987.12.01', 'macho', 'macho12!@', '2023-12-01 04:57:29'),
('스머프', '010-1234-1234', '1923.01.30', 'smp12', 'smp123!@#', '2023-12-01 06:20:17');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `innisfree_table`
--
ALTER TABLE `innisfree_table`
  ADD PRIMARY KEY (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
