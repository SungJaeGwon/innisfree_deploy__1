
--
-- 장바구니 테이블 구조 `innisfree_cart_table`
--

CREATE TABLE `innisfree_cart_table` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '장바구니 고유번호 기본키 PK',
  `userId` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '회원아이디 외래키 FK 회원테이블 참조',
  `번호` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '상품번호',
  `이미지` varchar(250) COLLATE utf8mb4_general_ci NOT NULL COMMENT '상품 이미지',
  `제품명` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '제품명',
  `할인율` double NOT NULL COMMENT '할인율',
  `판매가` int DEFAULT NULL COMMENT '판매가',
  `정가` int NOT NULL COMMENT '정가',
  `제품코드` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '제품코드(번호+옵션상품명)',
  `수량` int NOT NULL COMMENT '수량',
  `등록일` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (`idx`),
  FOREIGN KEY(userId) REFERENCES innisfree_table(userId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
