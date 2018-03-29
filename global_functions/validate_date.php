<?php

function validate_date($date, $format = 'Y-m-d\TH:i')
{
    $d = DateTime::createFromFormat($format, $date);

    return $d && $d->format($format) == $date;
}
