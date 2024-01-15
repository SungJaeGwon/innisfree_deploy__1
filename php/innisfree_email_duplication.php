<?
    include_once('./innisfree_header.php');
    // http://gksmf519.dothome.co.kr/innisfree/innisfree_email_duplication.php
    $userEmail = $_POST['userEmail'];

    $sql = "SELECT * FROM innisfree_table WHERE userEmail='$userEmail'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        echo 2;
    }
    else {
        echo -1;
    }

?>