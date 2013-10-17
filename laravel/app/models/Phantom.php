<?php

class Phantom extends Eloquent {

    protected $table = 'phantom_cache';

    protected $fillable = array(
        'url',
        'content'
    );

}
