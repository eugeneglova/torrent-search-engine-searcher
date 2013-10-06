<?php

class SearchLog extends Eloquent {

    protected $table = 'search_log';

    protected $visible = array(
        'query',
        'engine_id',
        'created_at'
    );

    protected $appends = array(
        'now'
    );

    protected $fillable = array(
        'query',
        'engine_id',
        'category_id',
        'ip',
        'ua'
    );

    public function getNowAttribute() {
        return $this->attributes['now'];
    }

    public function scopeGetRecentSearches($query) {
        return $query->orderBy('created_at', 'desc')->groupBy('query', 'ip')->addSelect($this->visible)->addSelect(DB::raw('UTC_TIMESTAMP() as `now`'))->limit(20);
    }

}
