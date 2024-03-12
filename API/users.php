<?php
$users = [
    ['id' => 1, 'name' => 'pippo', 'age' => 25, 'email' => '<EMAIL>', 'password' => '<PASSWORD>'],
    ['id' => 2, 'name' => 'topolino', 'age' => 26, 'email' => '<EMAIL>', 'password' => '<PASSWORD>'],
    ['id' => 3, 'name' => 'fernando', 'age' => 20, 'email' => '<EMAIL>', 'password' => '<PASSWORD>'],
    ['id' => 4, 'name' => 'antonio', 'age' => 23, 'email' => '<EMAIL>', 'password' => '<PASSWORD>'],
    ['id' => 5, 'name' => 'giuseppe', 'age' => 21, 'email' => '<EMAIL>', 'password' => '<PASSWORD>'],
    
];

$response = [
    "status" => 200,
    "message"  => "Successfully retrieved users",
    "payload" => $users, 
];

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($response);
?>