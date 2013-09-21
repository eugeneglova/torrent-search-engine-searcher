<?php

class Page extends Eloquent {

    protected $table = 'pages';

    protected $collection_fields = array(
        'id',
        'name',
        'route',
        'is_custom'
    );

    protected $model_fields = array(
        'id',
        'name',
        'title',
        'head_title',
        'head_description',
        'content'
    );

    public function scopeGetPages($query) {
        return $query->orderBy('sort')->addSelect($this->collection_fields);
    }

    public function scopeGetById($query, $id) {
        return $query->whereId($id)->addSelect($this->model_fields);
    }

}
