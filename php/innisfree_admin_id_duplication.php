<?
    include_once('./innisfree_header.php');

    $adminId = $_POST['adminId'];

    $sql = "SELECT * FROM innisfree_admin_table WHERE adminId='$adminId'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        echo 1;
    }
    else {
        echo 0;
    }

?>