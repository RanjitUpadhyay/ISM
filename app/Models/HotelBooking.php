<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HotelBooking extends Model
{
    protected $table = 'hotel_bookings';

    protected $primaryKey = 'booking_id';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'name',
        'gender',
        'email',
        'phone',
        'room_no',
        'room_type',
        'check_in',
        'check_out',
        'booking_status'
    ];

    public function payment()  //Think-"I am a Booking. I have one Payment."
    {
        return $this->hasOne(HotelPayment::class, 'booking_id', 'booking_id');
    }
}

//hasOne() means: "This model has exactly one related record." i.e One HotelBooking has one HotelPayment(One booking has one payment.)
//HotelPayment- "Use the HotelPayment model (class)."
//First 'booking_id'-:This is the foreign key in the related table (hotel_payments).
//Second 'booking_id'-:This is the local (primary) key in the current table (hotel_bookings). line 11
//Laravel matches these two columns i.e hotel_bookings.booking_id=hotel_payments.booking_id