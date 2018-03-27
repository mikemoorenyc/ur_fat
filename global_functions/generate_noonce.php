<?php
function generate_noonce($length = 20)
{
    $buf = '';
    for ($i = 0; $i < $length; ++$i) {
        $buf .= chr(mt_rand(0, 255));
    }
    return bin2hex($buf);
}
