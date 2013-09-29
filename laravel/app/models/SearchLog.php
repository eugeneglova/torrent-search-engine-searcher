<?php

class SearchLog extends Eloquent {

    protected $table = 'search_log';

    protected $fillable = array(
        'query',
        'engine_id',
        'category_id',
        'ip',
        'ua'
    );

}
