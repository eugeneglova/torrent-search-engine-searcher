<?php

class Page extends Eloquent {

    protected $table = 'pages';

    protected $visible = array(
        'id',
        'name',
        'title',
        'description'
    );

}
