<?php

class Engine extends Eloquent {

    protected $table = 'ss2_sites';

    protected $visible = array(
        'id',
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

}
