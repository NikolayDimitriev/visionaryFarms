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
    				<p>Name: '.$_POST['name'].'</p>
                    <p>Phone: '.$_POST['phone_f'].'</p>                     
    				<br>';

        if((isset($_POST['email'])&&$_POST['email']!="")){
            $message .='<p>Email: '.$_POST['email'].'</p>';
        }
        if((isset($_POST['message'])&&$_POST['message']!="")){
            $message .='<p>Message: '.$_POST['message'].'</p>';
        }

        $message .='
                </body>
            </html>';
        $headers = "From: ".$from_title." <".$from_mail.">\r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        mail($to, $subject , $message, $headers);
    }