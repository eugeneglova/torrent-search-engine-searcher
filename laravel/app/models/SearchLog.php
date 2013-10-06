<?php

class SearchLog extends Eloquent {

    protected $table = 'search_log';

    protected $visible = array(
        'query',
        'engine_id',
        'created_at'
    );

    protected $fillable = array(
        'query',
        'engine_id',
        'category_id',
        'ip',
        'ua'
    );

    public function scopeGetRecentSearches($query) {
        return $query->orderBy('created_at')->groupBy('query', 'ip')->limit(20);
    }

}
