<?php

class Group extends Eloquent {

    protected $table = 'ss2_site_groups';

    protected $visible = array(
        'id',
        'name',
        'slug',
        'sort'
    );

    public static function getGroups() {
        return static::where('enabled', 1)->get();
    }

}
