<?php

use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Site extends Eloquent {

    protected $table = 'site';

    protected $primaryKey = 'site_id';

    protected $visible = array(
        'site_id',
        'site_group_id',
        'name',
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

    public function scopeHasConstraint($query, $relation, $constraints)
    {

        $instance = $this->$relation();

        $foreignTable = $instance->getModel()->getTable();

        if ($instance instanceof HasOneOrMany) {
            $foreignKey = $instance->getPlainForeignKey();
            $query->join($foreignTable, $foreignTable.'.'.$foreignKey, '=', $this->table.'.'.$this->primaryKey);
        } elseif ($instance instanceof BelongsTo) {
            $foreignKey = $instance->getForeignKey();
            $primaryKey = $instance->getModel()->getKeyName();
            $query->join($foreignTable, $foreignTable.'.'.$primaryKey, '=', $this->table.'.'.$foreignKey);
        } else {
            throw new \InvalidArgumentException('Only works on HasOneOrMany and BelongsTo relationships.');
        }

        call_user_func($constraints, $query, $foreignTable);

        return $query->addSelect($this->table . '.*')->addSelect($this->visible);
    }

}
