<?
    include_once('./innisfree_header.php');

    $adminName       = "김마포";
    $adminHp         = "010-1111-1111";
    $adminBirth      = "1977";
    $adminId         = "qwer1234";
    $adminPw         = "as123123132";
    $adminEmail      = "qwerqwer11@naver.com";
    $adminAddress    = "경주시 반야동 불국사";

    $sql = "INSERT INTO innisfree_admin_table (adminName,adminHp,adminBirth,adminId,adminPw, adminEmail, adminAddress) 
            VALUES ('$adminName','$adminHp','$adminBirth','$adminId','$adminPw','$adminEmail','$adminAddress')";

    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo "테스트 성공!!";
    }
    else {
        echo "테스트 실패...";
    }
?>