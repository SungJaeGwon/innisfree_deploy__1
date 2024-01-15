<?
    include_once('./innisfree_header.php');
    
    $nType = '고객 센터';
    $nSubject = "이니스프리 공식몰 점검으로 인한 서비스 일시 중단 안내";    
    $nContent = "보다 나은 서비스 제공을 위해 아래 일정으로 시스템을 점검할 예정입니다.

    점검시간 동안 이니스프리 공식 온라인몰 접속 및 서비스 이용이 어려운 점 양해 부탁드립니다.
    
    - 일시: 2023. 11. 7(화) 오전 01:00 ~ 02:00(1시간 예정)
    - 목적: 시스템 작업
    - 범위: 이니스프리 공식 온라인몰 전체 서비스 이용 불가
    
    감사합니다.";
    $nName = "김마포";
    $nId = "qwer1234";
   
    $sql = "INSERT INTO innisfree_notice_table (nType, nSubject, nContent, nName, nId)
            VALUES ('$nType','$nSubject','$nContent','$nName','$nId')";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo "공지사항 게시글 저장 성공!";
    }
    else{
        echo "공지사항 게시글 저장 실패!";
    }

?>