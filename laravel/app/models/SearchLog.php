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
        if (!array_key_exists('now', $this->attributes)) {
            return false;
        }

        return $this->attributes['now'];
    }

    public function scopeGetRecentSearches($query) {
        return $query->orderBy('created_at', 'desc')->groupBy('query', 'ip', 'ua')->addSelect($this->visible)->addSelect(DB::raw('UTC_TIMESTAMP() as `now`'))->limit(20);
    }

    public function scopeGetTopSearches($query) {
        return $query->from(DB::raw('(select * from ' . $this->table . ' where `created_at` > UTC_TIMESTAMP() - INTERVAL 1 MONTH group by `query`, `ip`, `ua`) as subquery'))->groupBy('query')->orderBy(DB::raw('count(query)'), 'desc')->addSelect($this->visible)->limit(20);
    }

}
