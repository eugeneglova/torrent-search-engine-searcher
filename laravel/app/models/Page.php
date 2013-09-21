<?php

class Page extends Eloquent {

    protected $table = 'pages';

    protected $visible = array(
        'id',
        'name',
        'title',
        'head_title',
        'head_description',
        'route',
        'is_custom'
    );

    public static function getPages() {
        return static::orderBy('sort')->get();
    }

}
