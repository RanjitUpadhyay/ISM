<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestPayment extends Model
{
    protected $table='rest_payment';
    protected $primaryKey='payment_id';
    protected $keyType='int';
    public $incrementing=true;
    protected $fillable=['booking_id','payment_mode','payment_status','total_bill'];
}

function booking()
{
    return $this->belongsTo(RestBooking::class,'booking_id','booking_id');
}