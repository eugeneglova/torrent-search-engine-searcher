<?php

class Setting extends Eloquent {

    protected $table = 'ss2_config';

    protected $visible = array(
        'key',
        'value'
    );

    public static function getSettings() {
        return static::where('key', 'version_engines')->get();
    }

}
