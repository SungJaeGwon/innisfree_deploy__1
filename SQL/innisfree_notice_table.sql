
--
-- 공지사항 테이블 구조 `innisfree_notice_table`
--

CREATE TABLE `innisfree_notice_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `nType` varchar(16) DEFAULT NULL,
  `nSubject` varchar(250) NOT NULL,
  `nContent` text NOT NULL,
  `nName` varchar(20) DEFAULT NULL,
  `nId` varchar(16) DEFAULT NULL,
  `nDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  FOREIGN KEY(nId) REFERENCES innisfree_admin_table(adminId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
