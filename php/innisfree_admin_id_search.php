<?
    include_once('./innisfree_header.php');

    $adminName = $_POST['adminName'];
    $adminHp = $_POST['adminHp'];


    $sql = "SELECT adminId FROM innisfree_admin_table
            WHERE adminName='$adminName' AND adminHp='$adminHp'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['adminId'].'"}';
    }
    else {
        echo '';
    }

?>