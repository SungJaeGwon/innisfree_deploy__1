<?
    include_once('./innisfree_header.php');

    $userId = 'jojo';
    $userPw = 'jojo123123';

    $sql = "SELECT userId, userName, userHp, userAddress 
            FROM   innisfree_table 
            WHERE  userId='$userId' AND userPw='$userPw'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "휴대폰": "'.$record['userHp'].'", "주소": "'.$record['userAddress'].'" }';
    }
    else{
        echo '';
    }
?>