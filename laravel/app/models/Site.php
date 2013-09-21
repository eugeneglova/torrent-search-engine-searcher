<?php

class Site extends Base {

    protected $table = 'site';

    protected $primaryKey = 'site_id';

    protected $collection_fields = array(
        'site_id',
        'site_group_id',
        'name',
        'home_url',
        'sort'
    );

    protected $model_fields = array(
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

    public function scopeGetSitesByGroupId($query, $group_id = 0) {
        return $query->hasConstraint('engine', function($query, $table) use ($group_id) {
           $query->where($table . '.enabled', 1);
           if ($group_id) {
               $query->where($table . '.site_group_id', $group_id);
           }
        })->addSelect($this->collection_fields);
    }

    public function scopeGetById($query, $id) {
        return $query->getSitesByGroupId(0)->whereSiteId($id)->addSelect($this->model_fields);
    }

}
