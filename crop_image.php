<?php
    $im;
    $path = $_GET['img_name'];
    if(substr($path,-3,3) == 'jpg' || substr($path,-4,4) == 'jpeg')
        $im = imagecreatefromjpeg($path);
    else
        $im = imagecreatefrompng($path);
    $real_w = imagesx($im);
    $real_h = imagesy($im);
    $im2 = imagecrop($im, ['x' => $real_w * +$_GET['l'] / +$_GET['w'],
    'y' => $real_h * +$_GET['t'] / +$_GET['h'],
    'width' => $real_w * (+$_GET['w'] - +$_GET['l'] - +$_GET['r']) / +$_GET['w'], 
    'height' => $real_h * (+$_GET['h'] - +$_GET['t'] - +$_GET['b']) / +$_GET['h']]);

    unlink($path);
    $path = explode('/', $path);
    $path[1] = 'edited_' . $path[1];
    $path = implode('/',$path);

    if(substr($path,-3,3) == 'jpg' || substr($path,-4,4) == 'jpeg')
        imagejpeg($im2, $path); 
    else
        imagepng($im2, $path);    

    echo $path;