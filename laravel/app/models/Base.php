<?php

use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Base extends Eloquent {

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