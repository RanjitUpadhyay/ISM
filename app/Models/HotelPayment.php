<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HotelPayment extends Model
{
    protected $table = 'hotel_payments';

    protected $primaryKey = 'payment_id';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'booking_id',
        'payment_mode',
        'payment_status',
        'total_amount'
    ];

    public function booking()  //Think-"I am a Payment. I belong to one Booking."
    {
        return $this->belongsTo(HotelBooking::class, 'booking_id', 'booking_id');
    }
}

//$this- Current HotelPayment object
//belongsTo-"This model belongs to another model." i.e A HotelPayment Model belongs to a HotelBooking Model.(One payment belongs to one booking)
// first 'booking_id'- Foreign key in the current table (hotel_payments)
//second 'booking_id'-Primary key in the related table (hotel_bookings)
//HotelBooking::class-Use the HotelBooking model (class).

//Since you have two tables, you need two models. Here are the simplest versions in the same style as your Restaurant model.
//Why are the payment() and booking() functions needed?
//Because your controller uses:HotelBooking::with('payment')->get(); and $booking->payment()->update([...]);
//Without these relationship methods, those lines will not work.

//So these are the simplest models while still supporting CRUD operations on both related tables.