<?php
// Connecting, selecting database
$dbconn = pg_connect("host= port= dbname= user= password=")
or die('Could not connect: ' . pg_last_error());

$query = 'SELECT quizname, quiztext FROM  quiz ORDER BY quizid DESC';

$result = pg_query($query) or die('Query failed: ' . pg_last_error());
// next lines are reused
$i = 0;
	echo'<table class="table table-bordered table-inverse table-hover table-responsive">';
	echo'<thead>';
	echo'<tr>';
    echo'               <th>Quiz Name</th>';
    echo'           <th>Quiz Description</th>';
    echo'       </tr>';
    echo'           <tbody>';
	echo'       <tr>';

                    while ($row = pg_fetch_row($result))
                    {
                        echo '<tr>';
                        $count = count($row);
                        $y = 0;
                        while ($y < $count)
                        {
                            $c_row = current($row);
                            echo '<td>' . $c_row . '</td>';
                            next($row);
                            $y = $y + 1;
                        }
                        echo '</tr>';
                        $i = $i + 1;
                    }
                    pg_free_result($result);

                echo'</tbody></table>';
?>