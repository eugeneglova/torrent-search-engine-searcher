<?php

class Setting extends Eloquent {

    protected $table = 'ss2_config';

    protected $visible = array(
        'key',
        'value'
    );

}
