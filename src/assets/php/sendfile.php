<?php
    include_once("config.php");
    if((isset($_POST['phone_f'])&&$_POST['phone_f']!="")){
        $to = $address;
        $subject = $subject_name;
        $from_title = $from_title_name;
        $from_mail = $from_mail_link;
        $message ='
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Name: '.$_POST['name_f'].'</p>
                    <p>Phone: '.$_POST['phone_f'].'</p>                     
                    <br>';

        if((isset($_POST['email'])&&$_POST['email']!="")){
            $message .='<p>Email: '.$_POST['email'].'</p>';
        }
        if((isset($_POST['message'])&&$_POST['message']!="")){
            $message .='<p>Message: '.$_POST['message'].'</p>';
        }
        
        $message .='</body></html>';
        $boundary = md5(date('r', time()));
        $filesize = '';
        $headers = "MIME-Version: 1.0\r\n";
        $headers = "From: ".$from_title." <".$from_mail.">\r\n";
        $headers .= "Reply-To: " . $from . "\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
        $message="Content-Type: multipart/mixed; boundary=\"$boundary\"
        
        --$boundary
        Content-Type: text/html; charset=\"utf-8\"
        Content-Transfer-Encoding: 7bit
        
        $message";
        for($i=0;$i<count($_FILES['fileFF']['name']);$i++) {
            if(is_uploaded_file($_FILES['fileFF']['tmp_name'][$i])) {
                $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileFF']['tmp_name'][$i])));
                $filename = $_FILES['fileFF']['name'][$i];
                $filetype = $_FILES['fileFF']['type'][$i];
                $filesize += $_FILES['fileFF']['size'][$i];
                $message.="
        
        --$boundary
        Content-Type: \"$filetype\"; name=\"$filename\"
        Content-Transfer-Encoding: base64
        Content-Disposition: attachment; filename=\"$filename\"
        
        $attachment";
            }
        }
        $message.="
        --$boundary--";

        if ($filesize < 10000000) { // check file size
            mail($to, $subject, $message, $headers);
            echo 'Your message send!';
        } else {
            echo 'Error. Size more then 10 MB.';
        }
    }
