<?
    include_once('./innisfree_header.php');
    $sql = "SELECT * FROM innisfree_table";
    $res = mysqli_query($conn, $sql);
 
    // 객체(배열객체)로 선언           
    if( mysqli_num_rows($res) > 0 ){        
        $arr = array();
        while( $row = mysqli_fetch_array($res) ){
            array_push($arr, array(
                '아이디'=> $row['userId'],
                '비밀번호'  => $row['userPw'],
                '이름'  => $row['userName'],
                '휴대폰'  => $row['userHp'],
                '이메일'  => $row['userEmail'],
                '생년월일'=> $row['userBirth'],
                '주소'=> $row['userAddress']
                
            ));
        }        
    } 


    // JSON 형식의 객체로 생성 : 유니코드 사용 안함 JSON_UNESCAPED_UNICODE
    $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $json;

?>