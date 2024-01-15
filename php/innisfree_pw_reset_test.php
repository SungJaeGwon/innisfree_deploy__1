<?

    // http://gksmf519.dothome.co.kr/innisfree/innisfree_pw_reset_test.php
    include_once('./innisfree_header.php');

    // REST API 아이디, 비밀번호
    $userId = 'gamja';
    $userPw = 'gamja1111';

    // 비밀번호 수정
    $sql = "UPDATE innisfree_table SET userPw = '$userPw'
            WHERE userId='$userId'";
    mysqli_query($conn, $sql);
   
   
    // 수정된 데이터 조회
    $sqlSelect = "SELECT * FROM innisfree_table
                  WHERE userId='$userId'";
    $res = mysqli_query($conn, $sqlSelect);
    
    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "휴대폰": "'.$record['userHp'].'", "주소": "'.$record['userAddress'].'", "생년월일": "'.$record['userBirth'].'", "비밀번호": "'.$record['userPw'].'","이메일": "'.$record['userEmail'].'" }';
    }
    else {
        echo 0;
    }
?>