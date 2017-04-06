<?php 

$name = pg_escape_string($_POST['name']); 
$score = pg_escape_string($_POST['score']);


// Connecting, selecting database
$dbconn = pg_connect("host= port= dbname= user= password=")
    or die('Could not connect: ' . pg_last_error());

$result = pg_query($dbconn, "INSERT INTO leaderscore(name, score) VALUES('{$name}','{$score}');");
	   
	   if (!$result) { 
            $errormessage = pg_last_error(); 
            echo "Error with query: " . $errormessage; 
            exit(); 
        } 
        pg_close(); 

// Closing connection
pg_close($dbconn);
?>
