<?
    include_once('./innisfree_header.php');
    // http://gksmf519.dothome.co.kr/innisfree/innisfree_data_reset_test.php
    $userId = 'gamja';
    $userEmail = '이메일 바껴라';
    $userHp = '010456456';
    $userAddress = '요맨~';

    $sql = "UPDATE innisfree_table 
            SET userEmail = '$userEmail',userHp = '$userHp',userAddress = '$userAddress'
            WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);
    
    if( $res == true ){
        echo 1;
    }
    else {
        echo 0;
    }
?>