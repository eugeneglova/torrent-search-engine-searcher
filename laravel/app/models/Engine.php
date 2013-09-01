<?php

class Engine extends Eloquent {

    protected $table = 'ss2_sites';

    protected $visible = array(
        'id',
        'name',
        'home_url',
        'search_url'
    );

    public function categories()
    {
        return $this->belongsToMany('Category', 'ss2_categories_sites', 'category_id', 'site_id')->withPivot('search_url');
    }

}
