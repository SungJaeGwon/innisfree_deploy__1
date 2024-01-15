<?
    include_once('./innisfree_header.php');


    $userId = $_POST['userId'];
    
    //  회원정보 삭제
    $sql = "DELETE FROM innisfree_table          
            WHERE   userId='$userId'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>