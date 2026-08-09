<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LodgePayment extends Model
{
    protected $table='lodgePayment';
    protected $primaryKey='payment_id';
    public $incrementing=true;
    protected $keyType='int';

    protected $fillable=['booking_id','payment_mode','payment_status','total_bill'];

    public function booking()
    {
        return $this->belongsTo(LodgeBooking::class,'booking_id','booking_id');
    }
}
