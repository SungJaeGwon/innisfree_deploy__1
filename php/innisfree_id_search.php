<?
    include_once('./innisfree_header.php');

    $userName = $_POST['userName'];
    $userHp = $_POST['userHp'];


    $sql = "SELECT userId FROM innisfree_table
            WHERE userName='$userName' AND userHp='$userHp'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'"}';
    }
    else {
        echo '';
    }

?>