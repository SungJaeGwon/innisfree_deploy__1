<?
    include_once('./innisfree_header.php');

    $userId = $_POST['userId'];

    $SQL = "SELECT * FROM innisfree_cart_table 
            WHERE userId = '$userId'";
    $result = mysqli_query($conn, $SQL);
    
    if(mysqli_num_rows($result) > 0){
        $arr = array();
        while($item = mysqli_fetch_array($result)){
            array_push($arr, array(
                '번호' => $item['번호'],
                '이미지' => $item['이미지'],
                '제품명' => $item['제품명'],
                '할인율' => $item['할인율'],
                '판매가' => $item['판매가'],
                '정가' => $item['정가'],
                '제품코드' => $item['제품코드'],
                '수량' => $item['수량']
            ));
        };
    }
    $json_data = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $json_data;
?>