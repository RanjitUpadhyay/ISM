<?php

namespace App\Http\Controllers;

use App\Http\Requests\HotelBookingRequest;
use App\Models\HotelBooking;
use App\Models\HotelPayment;

class HotelBookingController extends Controller
{                                
    // Display All Bookings          //with' keyword means "Also fetch the related model (relationship)."Ex-with('payment') means Also fetch the payment relationship.
    public function index()         //with('payment')->get();->"Get all HotelBooking records, and also load the related Payment records."
    {                                //('payment') means Laravel looks for this method inside HotelBooking.php(Model). 'payment' is the method name.
        $bookings = HotelBooking::with('payment')->get();

        return response()->json($bookings);
    }

    // Store Booking
    public function store(HotelBookingRequest $request)
    {
        $booking = HotelBooking::create([     // $booking → the HotelBooking object and HotelBooking-first Model  
            'name' => $request->name,            //-> → access a property of that object
            'gender' => $request->gender,       //
            'email' => $request->email,
            'phone' => $request->phone,
            'room_no' => $request->room_no,
            'room_type' => $request->room_type,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'booking_status' => $request->booking_status
        ]);

        HotelPayment::create([                             //HotelPayment-2nd Model
            'booking_id' => $booking->booking_id,         //$booking->booking_id means "Give me the booking_id property from the $booking object.
            //Store the booking_id from the $booking object into the booking_id column of the hotel_payments table.

            'payment_mode' => $request->payment_mode,      //booking_id → get the booking_id property
            'payment_status' => $request->payment_status,
            'total_amount' => $request->total_amount
        ]);

        return response()->json([
            'message' => 'Booking Created Successfully'
        ], 201);
    }

    // Show Single Booking
    public function show($booking_id)
    {
        $booking = HotelBooking::with('payment')->find($booking_id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking Not Found'
            ], 404);
        }

        return response()->json($booking);
    }

    // Update Booking
    public function update(HotelBookingRequest $request, $booking_id)
    {
        $booking = HotelBooking::find($booking_id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking Not Found'
            ], 404);
        }
          else{
            $booking->update([
                'name' => $request->name,
                'gender' => $request->gender,
                'email' => $request->email,
                'phone' => $request->phone,
                'room_no' => $request->room_no,
                'room_type' => $request->room_type,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
                'booking_status' => $request->booking_status
            ]);
    
            $booking->payment()->update([
                'payment_mode' => $request->payment_mode,
                'payment_status' => $request->payment_status,
                'total_amount' => $request->total_amount
            ]);
    
            return response()->json([
                'message' => 'Booking Updated Successfully'
            ]);
          }
       
    }

    // Delete Booking
    public function destroy($booking_id)
    {
        $booking = HotelBooking::find($booking_id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking Not Found'
            ], 404);
        }
       else{
        $booking->delete();

        return response()->json([
            'message' => 'Booking Deleted Successfully'
        ]);
       }
       
    }
}