<?php
    $file = $_FILES['file'];
    $exx = $file['type'] == 'image/jpeg' ? '.jpg' : '.png';
    $path = 'uploads/' . time() . md5(rand(0,1000000000)) . $exx;
    move_uploaded_file($file['tmp_name'], $path);

    echo $path;