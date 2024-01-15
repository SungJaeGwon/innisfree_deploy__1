<?
include_once('./innisfree_header.php');



$SQL = "CREATE TABLE innisfree_notice_table (
    idx            INT               NOT NULL AUTO_INCREMENT,
    nType          VARCHAR(16)       NULL,
    nSubject       VARCHAR(250)      NOT NULL,
    nContent       TEXT              NOT NULL,
    nName          VARCHAR(20)       NULL,
    nId            VARCHAR(16)       NULL,
    nDate          timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(idx)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";




$result = mysqli_query($conn, $SQL);
if($result==false){
    echo "공지사항 테이블 만들기 실패";
}
else{
    echo "공지사항 테이블 만들기 성공";
}
?>



