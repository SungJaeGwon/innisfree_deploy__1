-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-12-08 13:41
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
-- 테이블 구조 `innisfree_notice_table`
--

CREATE TABLE `innisfree_notice_table` (
  `idx` int NOT NULL,
  `nType` varchar(16) DEFAULT NULL,
  `nSubject` varchar(250) NOT NULL,
  `nContent` text NOT NULL,
  `nName` varchar(20) DEFAULT NULL,
  `nId` varchar(16) DEFAULT NULL,
  `nDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `innisfree_notice_table`
--

INSERT INTO `innisfree_notice_table` (`idx`, `nType`, `nSubject`, `nContent`, `nName`, `nId`, `nDate`) VALUES
(1, '고객 센터', '이니스프리 공식몰 점검으로 인한 서비스 일시 중단 안내', '보다 나은 서비스 제공을 위해 아래 일정으로 시스템을 점검할 예정입니다.\r\n\r\n    점검시간 동안 이니스프리 공식 온라인몰 접속 및 서비스 이용이 어려운 점 양해 부탁드립니다.\r\n    \r\n    - 일시: 2023. 11. 7(화) 오전 01:00 ~ 02:00(1시간 예정)\r\n    - 목적: 시스템 작업\r\n    - 범위: 이니스프리 공식 온라인몰 전체 서비스 이용 불가\r\n    \r\n    감사합니다.', '김마포', 'qwer1234', '2023-12-04 06:15:16'),
(2, '이벤트 공지', '이니스프리 고객 혜택 변경 안내 (23년 12월 1일~)', '안녕하세요 고객님,&lt;br /&gt;\r\n&lt;br /&gt;\r\n오늘도 이니스프리 공식몰을 찾아 주셔서 감사합니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n &lt;br /&gt;\r\n&lt;br /&gt;\r\n2023년 12월 1일(금)부터 신규 고객 혜택이 변경될 예정입니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n혜택 변경에 대해 아래와 같이 사전 안내 드리오니 참고 부탁 드립니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n &lt;br /&gt;\r\n&lt;br /&gt;\r\n더 나은 서비스를 위해 노력 하겠습니다. 감사합니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n &lt;br /&gt;\r\n&lt;br /&gt;\r\n※ 변경 내용 시행 일자 : 2023년 12월 1일 시행&lt;br /&gt;\r\n&lt;br /&gt;\r\n- 일정은 당사 사정에 의해 변경될 수 있습니다.', '김마포', 'qwer1234', '2023-12-04 09:09:46'),
(3, '고객 센터', '개인정보보호법 개정 관련 서비스 이용약관 변경 안내', '항상 저희 이니스프리를 사랑해주시는 고객님께 감사드립니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n아래의 사유로 서비스 이용약관 변경내역이 있어 공지드립니다. &lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n1. 개정 사유  &lt;br /&gt;\r\n&lt;br /&gt;\r\n- 개인정보보호법 개정 시행(2023. 09. 15)에 따라 &apos;개인정보 유효기간제&apos; 삭제&lt;br /&gt;\r\n&lt;br /&gt;\r\n- 개인정보보호법 제39조의6(개인정보의 파기에 대한 특례) 조항 삭제&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n2. 서비스 이용약관 시행일 : 2023. 09. 15&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n3. 개정 내용&lt;br /&gt;\r\n&lt;br /&gt;\r\n - 제7조 (회원 탈퇴 및 자격 상실 등) ②항 삭제&lt;br /&gt;\r\n&lt;br /&gt;\r\n - 제22조(포인트 삭감 및 소멸) ②항 (1년 간 몰 이용기록이 없는 경우 포함) 문구 삭제&lt;br /&gt;\r\n&lt;br /&gt;\r\n - 제22조(포인트 삭감 및 소멸) ③항 (1년 간 몰 이용기록이 없는 경우 포함) 문구 삭제&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n앞으로도 더 나은 서비스와 혜택을 제공해드리기 위해 노력하겠습니다.&lt;br /&gt;\r\n감사합니다.', '김마포', 'qwer1234', '2023-12-04 13:39:21'),
(4, '고객 센터', '12/17 02시~ 12/17 05시 이니스프리 공식몰 서비스 일시 중단 안내', '안녕하세요 고객님&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n보다 나은 서비스 제공을 위해 아래 일정으로 시스템 중단될 예정입니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n작업시간 동안 이니스프리 공식 온라인몰 접속 및 서비스 이용이 어려운 점 양해 부탁드립니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n*일시: 2023. 8. 17(목) am 2:00 ~ 5:00&lt;br /&gt;\r\n&lt;br /&gt;\r\n*목적: 이니스프리 시스템 작업&lt;br /&gt;\r\n&lt;br /&gt;\r\n*범위: 이니스프리 공식 온라인몰 전체 서비스 이용 불가&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n작업이 완료되는 대로 이용하실 수 있으며 고객님의 이용에 불편드려 죄송합니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n앞으로도 이니스프리 공식 온라인몰에 많은 관심과 이용 부탁드립니다.&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n&lt;br /&gt;\r\n감사합니다.뿅', '', '', '2023-12-05 08:44:01'),
(12, '매장 공지', '안녕하세요', '반가워요', '', '', '2023-12-08 03:13:30');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `innisfree_notice_table`
--
ALTER TABLE `innisfree_notice_table`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `innisfree_notice_table`
--
ALTER TABLE `innisfree_notice_table`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
