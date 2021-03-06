<?php

class Engine extends Base {

    protected $table = 'ss2_sites';

    protected $visible = array(
        'id',
        'site_group_id',
        'name',
        'home_url',
        'search_url',
        'post_query',
        'visible',
        'sort'
    );

    public function categories()
    {
        return $this->belongsToMany('Category', 'ss2_categories_sites', 'site_id', 'category_id')->withPivot('search_url');
    }

    public function site()
    {
        return $this->belongsTo('Site', 'd_id');
    }

    public static function getEngines() {
        // $engines = Engine::where('enabled', 1)
        //     ->join('site', 'site.site_id', '=', 'ss2_sites.d_id')
        //     ->where('site.search_engine', 1)->get();

        return static::hasConstraint('site', function($query, $table) {
           $query->where($table . '.search_engine', 1);
        })->where('enabled', 1)->get();

        // $engines = Engine::where('enabled', 1)->get();
        // dd(DB::getQueryLog());
    }

    public static function getCategoriesByEngineId($engine_id) {
        return static::find($engine_id)->categories()->get(array('*', 'search_url'));
    }

}
