<?
    include_once('./innisfree_header.php');

    $SQL = "CREATE TABLE innisfree_admin_table (
        adminName            VARCHAR(50)    NOT NULL,
        adminHp              VARCHAR(13)    NOT NULL,
        adminBirth           VARCHAR(10)    NOT NULL,
        adminId              VARCHAR(16)    NOT NULL,
        adminPw              VARCHAR(16)    NOT NULL,
        adminEmail           VARCHAR(250)   NOT NULL,
        adminAddress          VARCHAR(250)   NOT NULL,
        adminSignInDate      timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(adminId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";
    
    $result = mysqli_query($conn, $SQL);
    if($result==false) {
        echo "테이블 만들기 실패...";
    }
    else {
        echo "테이블 만들기 성공!!!";
    }

?>