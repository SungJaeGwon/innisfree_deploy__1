<?
    include_once('./innisfree_header.php');

    $SQL = "CREATE TABLE innisfree_cart_table (
    `idx`                INT                                     NOT NULL           AUTO_INCREMENT     COMMENT '장바구니 고유번호 기본키 PK',
    `userId`             VARCHAR(16)                             NOT NULL                              COMMENT '회원아이디 외래키 FK 회원테이블 참조',       
    `번호`               VARCHAR(30)                             NOT NULL                              COMMENT '상품번호',                                                                  
    `이미지`             VARCHAR(250)                            NOT NULL                              COMMENT '상품 이미지',                  
    `제품명`             VARCHAR(100)                            NOT NULL                              COMMENT '제품명',                                                        
    `할인율`             DOUBLE                                  NOT NULL                              COMMENT '할인율',                                                        
    `판매가`             INT                                                                           COMMENT '판매가',                                                              
    `정가`                INT                                     NOT NULL                             COMMENT '정가',
    `제품코드`            VARCHAR(250)                                                                 COMMENT '제품코드(번호+옵션상품명)',
    `수량`                INT                                     NOT NULL                             COMMENT '수량',
    `등록일`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP     NOT NULL                             COMMENT '등록일',
    PRIMARY KEY(idx),
    FOREIGN KEY(userId) REFERENCES innisfree_table(userId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "장바구니 테이블 생성 실패";
    }
    else{
        echo "장바구니 테이블 생성 성공";
    }
?>