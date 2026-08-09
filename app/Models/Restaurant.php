<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $primaryKey='booking_id';
    public $incrementing=true;
    protected $keyType='int';
    protected $table='restaurant';
    protected $fillable=['name','email','phone','booking_date','table_no','table_status','booking_status','payment_mode','payment_status','total_bill'];
}
