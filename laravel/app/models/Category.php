<?php

class Category extends Eloquent {

    protected $table = 'ss2_categories';

    protected $visible = array(
        'id',
        'name',
        'search_url'
    );

}
