
--
-- 회원 테이블 구조 `innisfree_table`
--

CREATE TABLE `innisfree_table` (
  `userName` varchar(50) NOT NULL,
  `userHp` varchar(13) NOT NULL,
  `userBirth` varchar(10) NOT NULL,
  `userId` varchar(16) NOT NULL,
  `userPw` varchar(16) NOT NULL,
  `userEmail` varchar(250) NOT NULL,
  `userAddress` varchar(250) NOT NULL,
  `userService` varchar(250) NOT NULL,
  `userSignInDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
