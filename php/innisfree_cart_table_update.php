<?
    include_once('./innisfree_header.php');

    $userId = $_POST['userId'];
    $제품코드 = $_POST['제품코드'];
    $수량 = $_POST['수량'];
    
    $SQL = "UPDATE innisfree_cart_table 
            SET 수량='$수량'
            WHERE userId='$userId' AND 제품코드='$제품코드'";
    $result = mysqli_query($conn, $SQL);

    if($result == true){
        echo 1;
    }
    else{
        echo 0;
    }
?>