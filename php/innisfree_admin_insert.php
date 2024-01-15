<?

include_once('./innisfree_header.php');

$adminName  = $_POST['adminName'];
$adminHp    = $_POST['adminHp'];
$adminBirth = $_POST['adminBirth'];
$adminId    = $_POST['adminId'];
$adminPw    = $_POST['adminPw'];
$adminEmail    = $_POST['adminEmail'];
$adminAddress    = $_POST['adminAddress'];

$sql = "INSERT INTO innisfree_admin_table (adminName, adminHp, adminBirth,adminId, adminPw, adminEmail, adminAddress) 
        VALUES ('$adminName','$adminHp','$adminBirth','$adminId','$adminPw', '$adminEmail','$adminAddress')";

$result = mysqli_query($conn, $sql);

if( $result===true ){
    echo 1;
}
else {
    echo 0;
}

?>