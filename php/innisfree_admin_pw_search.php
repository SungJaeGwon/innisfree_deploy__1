<?
    include_once('./innisfree_header.php');

    $adminId = $_POST['adminId'];
    $adminHp = $_POST['adminHp'];


    $sql = "SELECT adminPw FROM innisfree_admin_table
            WHERE adminId='$adminId' AND adminHp='$adminHp'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"비밀번호": "'.$record['adminPw'].'"}';
    }
    else {
        echo '';
    }

?>