<?
    include_once('./innisfree_header.php');

    $userId = $_POST['userId'];
    $userHp = $_POST['userHp'];


    $sql = "SELECT userPw FROM innisfree_table
            WHERE userId='$userId' AND userHp='$userHp'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"비밀번호": "'.$record['userPw'].'"}';
    }
    else {
        echo '';
    }

?>