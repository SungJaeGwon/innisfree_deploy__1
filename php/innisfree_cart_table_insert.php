<?
    include_once('./innisfree_header.php');

    $userId = $_POST['userId'];
    $번호 = $_POST['번호'];
    $이미지 = $_POST['이미지'];
    $제품명 = $_POST['제품명'];
    $할인율 = $_POST['할인율'];
    $판매가 = $_POST['판매가'];
    $정가 = $_POST['정가'];
    $제품코드 = $_POST['제품코드'];
    $수량 = $_POST['수량'];

    $SQL = "SELECT * FROM innisfree_cart_table 
            WHERE userId = '$userId' AND 제품코드 = '$제품코드'";
    $result = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($result) > 0){
        $SQL = "UPDATE innisfree_cart_table SET 수량 = 수량 + '$수량' 
                WHERE userId = '$userId' AND 제품코드 = '$제품코드'";
        $result = mysqli_query($conn, $SQL);
        if($result == true){
            echo 1;
        }
        else{
            echo 0;
        }
    }
    else{
        $SQL = "INSERT INTO innisfree_cart_table (userId, 번호, 이미지, 제품명, 할인율, 판매가, 정가, 제품코드, 수량) 
                VALUES ('$userId', '$번호', '$이미지', '$제품명', '$할인율', '$판매가', '$정가','$제품코드', '$수량')";
        $result = mysqli_query($conn, $SQL);
        if($result == true){
            echo 2;
        }
        else{
            echo -1;
        }
    }
?>