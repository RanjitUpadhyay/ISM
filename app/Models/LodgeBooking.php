<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LodgeBooking extends Model
{
    protected $table='lodgeBooking';
    protected $primaryKey='booking_id';
    public $incrementing=true;
    protected $keyType='int';

    protected $fillable=['name','gender','phone','check_in','check_out','room_no'];

    public function payment(){
        return $this->hasOne(LodgePayment::class,'booking_id','booking_id');
    }
}
