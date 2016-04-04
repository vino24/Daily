<?php
header("Content-Type:text/html; charset=utf-8");

function music_search($word, $type)
{
    $url = "http://music.163.com/api/search/pc";
    $post_data = array(
        's' => $word,
        'offset' => '0',
        'limit' => '20',
        'type' => $type,
    );
    $referrer = "http://music.163.com/";
    $URL_Info = parse_url($url);    //  解析URL   Array ( [scheme] => http [host] => music.163.com [path] => /api/search/pc )
    $values = array();  
    $result = '';
    $request = '';
    foreach ($post_data as $key => $value) {
        $values[] = "$key=" . urlencode($value);    
    }
    $data_string = implode("&", $values);    // 将一个一维数组的值转化为字符串
    if (!isset($URL_Info["port"])) {
        $URL_Info["port"] = 80;
    }
    $request .= "POST " . $URL_Info["path"] . " HTTP/1.1\n";
    $request .= "Host: " . $URL_Info["host"] . "\n";
    $request .= "Referer: $referrer\n";
    $request .= "Content-type: application/x-www-form-urlencoded\n";
    $request .= "Content-length: " . strlen($data_string) . "\n";
    $request .= "Connection: close\n";
    $request .= "Cookie: " . "appver=1.5.0.75771;\n";
    $request .= "\n";
    $request .= $data_string . "\n";
    $fp = fsockopen($URL_Info["host"], $URL_Info["port"]);  //  fsockopen — 打开一个网络连接或者一个Unix套接字连接,fsockopen()将返回一个文件句柄，之后可以被其他文件类函数调
    fputs($fp, $request);
    $i = 1;
    while (!feof($fp)) {    //   测试文件指针是否到了文件结束的位置
        if ($i >= 15) {
            $result .= fgets($fp);  //  从文件指针中读取一行
        } else {
            fgets($fp);
            $i++;
        }
    }
    fclose($fp);
    return $result;
}

print_r(music_search("离婚","1"));