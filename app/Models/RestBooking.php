<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestBooking extends Model
{
    protected $table='rest_booking';
    protected $primaryKey='booking_id';
    protected $keyType='int';
    public $incrementing=true;
    protected $fillable=['name','phone','booking_date','table_no'];

    function payment()
    {
        return $this->hasOne(RestPayment::class,'booking_id','booking_id');
    }
}
