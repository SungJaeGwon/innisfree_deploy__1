
--
-- 관리자 테이블 구조 `innisfree_admin_table`
--

CREATE TABLE `innisfree_admin_table` (
  `adminName` varchar(50) NOT NULL,
  `adminHp` varchar(13) NOT NULL,
  `adminBirth` varchar(10) NOT NULL,
  `adminId` varchar(16) NOT NULL,
  `adminPw` varchar(16) NOT NULL,
  `adminEmail` varchar(250) NOT NULL,
  `adminAddress` varchar(250) NOT NULL,
  `adminSignInDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`adminId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
