<?php

class Site extends Base {

    protected $table = 'site';

    protected $primaryKey = 'site_id';

    protected $visible = array(
        'site_id',
        'site_group_id',
        'name',
        'home_url',
        'sort'
    );

    public function engine()
    {
        return $this->hasOne('Engine', 'd_id');
    }

    public static function getSitesByGroupId($group_id = 0) {
        return static::hasConstraint('engine', function($query, $table) use ($group_id) {
           $query->where($table . '.enabled', 1);
           if ($group_id) {
               $query->where($table . '.site_group_id', $group_id);
           }
        })->get();
        // dd(DB::getQueryLog());
    }

}
