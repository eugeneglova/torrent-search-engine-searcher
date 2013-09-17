<?php

use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Engine extends Eloquent {

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

    public function scopeHasConstraint($query, $relation, $constraints)
    {
        $instance = $this->$relation();

        $foreignTable = $instance->getModel()->getTable();
        $foreignKey = $instance->getForeignKey();

        if ($instance instanceof HasOneOrMany) {
            $query->join($foreignTable, $foreignTable.'.'.$foreignKey, '=', $this->table.'.'.$this->primaryKey);
        } elseif ($instance instanceof BelongsTo) {
            $primaryKey = $instance->getModel()->getKeyName();
            $query->join($foreignTable, $foreignTable.'.'.$primaryKey, '=', $this->table.'.'.$foreignKey);
        } else {
            throw new \InvalidArgumentException('Only works on HasOneOrMany and BelongsTo relationships.');
        }

        call_user_func($constraints, $query, $foreignTable);

        return $query->addSelect($this->table . '.*');
    }

}
