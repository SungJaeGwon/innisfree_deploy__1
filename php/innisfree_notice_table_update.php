<?
    include_once('./innisfree_header.php');


    $idx      = $_POST['idx'];
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


    
    // 공지사항 게시글 테이블 저장
    $sql = "UPDATE  innisfree_notice_table  
            SET     nType='$nType', nName='$nName', nId='$nId', nSubject='$nSubject', nContent='$nContent'
            WHERE   idx='$idx'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>