<?

include_once('./innisfree_header.php');

$userName  = $_POST['userName'];
$userHp    = $_POST['userHp'];
$userBirth = $_POST['userBirth'];
$userId    = $_POST['userId'];
$userPw    = $_POST['userPw'];
$userEmail    = $_POST['userEmail'];
$userPw    = $_POST['userPw'];
$userEmail    = $_POST['userEmail'];
$userAddress    = $_POST['userAddress'];
$userService    = $_POST['userService'];

$sql = "INSERT INTO innisfree_table (userName, userHp, userBirth,userId, userPw, userEmail, userAddress, userService) 
        VALUES ('$userName','$userHp','$userBirth','$userId','$userPw', '$userEmail','$userAddress','$userService')";

$result = mysqli_query($conn, $sql);

if( $result===true ){
    echo 1;
}
else {
    echo 0;
}

?>