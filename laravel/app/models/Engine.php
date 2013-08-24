<?php

class Engine extends Eloquent {

    protected $table = 'ss2_sites';

    protected $visible = array(
        'id',
        'name',
        'home_url',
        'search_url'
    );

}
