<?php

function validate_date($date, $format = 'Y-m-dTh:iA')
{
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) == $date;
}
