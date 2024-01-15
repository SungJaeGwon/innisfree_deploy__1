<?
    include_once('./innisfree_header.php');

    $userId = $_POST['userId'];
    $제품코드 = $_POST['제품코드'];
    
    $SQL = "DELETE FROM innisfree_cart_table
            WHERE userId='$userId' AND 제품코드='$제품코드'";
    $result = mysqli_query($conn, $SQL);

    if($result == true){
        echo 1;
    }
    else{
        echo 0;
    }
?>