<?
    include_once('./innisfree_header.php');

    $userId = "jin12";
    $번호 = "index_s02_04";
    $이미지 = "./images/index/36877_l_S_240.jpg";
    $제품명 = "[홀리데이] 레티놀 시카 흔적 앰플 대용량 세트";
    $할인율 = 0.24;
    $판매가 = 43320;
    $정가 = 57000;
    $제품코드 = "index_s02_04";
    $수량 = 1;

    $SQL = "INSERT INTO innisfree_cart_table (userId, 번호, 이미지, 제품명, 할인율, 판매가, 정가, 제품코드, 수량) 
            VALUES ('$userId', '$번호', '$이미지', '$제품명', '$할인율', '$판매가', '$정가','$제품코드', '$수량')";
    $result = mysqli_query($conn, $SQL);
    if($result == true){
        echo '테이블 저장 성공';
    }
    else{
        echo '테이블 저장 실패';
    }
?>