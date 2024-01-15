<?
    include_once('./innisfree_header.php');

    $userName       = "도우너";
    $userHp         = "010-1254-8852";
    $userBirth      = "1967";
    $userId         = "04";
    $userPw         = "12";
    $userEmail      = "downer@naver.com";
    $userAddress    = "우주시 대모험구 깐따비야동";
    $userService    = "모든 것 동의";

    $sql = "INSERT INTO innisfree_table (userName,userHp,userBirth,userId,userPw, userEmail, userAddress, userService) 
            VALUES ('$userName','$userHp','$userBirth','$userId','$userPw','$userEmail','$userAddress','$userService')";

    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo "테스트 성공!!";
    }
    else {
        echo "테스트 실패...";
    }
?>