<?
    include_once('./innisfree_header.php');

    $nType    = $_POST['nType'];
    $nName    = $_POST['nName'];
    $nId      = $_POST['nId'];
  
    $nSubject = str_replace( "'", "&apos;", $_POST['nSubject'] );
    $nContent = str_replace( "'", "&apos;", $_POST['nContent'] );

    $nSubject = str_replace( "\"", "&quot;", $nSubject );
    $nContent = str_replace( "\"", "&quot;", $nContent );

    $nSubject = str_replace( "<", "&lt;", $nSubject );
    $nContent = str_replace( "<", "&lt;", $nContent );

    $nSubject = str_replace( ">", "&gt;", $nSubject );
    $nContent = str_replace( ">", "&gt;", $nContent );
    
    $nSubject = nl2br($nSubject);
    $nContent = nl2br($nContent);

    $sql = "INSERT INTO innisfree_notice_table (nType, nName,  nId,  nSubject, nContent)
            VALUES ('$nType','$nName','$nId','$nSubject','$nContent')";
    $result = mysqli_query($conn, $sql);

    
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>