<?php

namespace App\Http\Controllers;

use App\Http\Requests\RestValidations;
use App\Models\RestBooking;
use App\Models\RestPayment;

class RestController extends Controller
{
    function index()
    {
        $bookings=RestBooking::with('payment')->get();
        return response()->json($bookings);
    }

    function store(RestValidations $req)
    {
        $booking=RestBooking::create([
            'name'=>$req->name,
            'phone'=>$req->phone,
            'booking_date'=>$req->booking_date,
            'table_no'=>$req->table_no
        ]);

         RestPayment::create([
            'booking_id'=>$booking->booking_id,
            'payment_mode'=>$req->payment_mode,
            'payment_status'=>$req->payment_status,
            'total_bill'=>$req->total_bill
         ]);

         return response()->json([
            'message'=>'Booking Created',
            'booking'=>$booking
         ],201);
    }

    function show($booking_id)
    {
        $booking=RestBooking::with('payment')->find($booking_id);

        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

            else{
                return response()->json($booking);
            }
    }

    function update(RestValidations $req, $booking_id)
    {
        $booking=RestBooking::find($booking_id);

        
        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

            else{ $booking->update([
            'name'=>$req->name,
            'phone'=>$req->phone,
            'booking_date'=>$req->booking_date,
            'table_no'=>$req->table_no
             ]);
            
             $booking->payment()->update([
                'booking_id'=>$req->booking_id,
                'payment_mode'=>$req->payment_mode,
                'payment_status'=>$req->payment_status,
                'total_bill'=>$req->total_bill
             ]);
             return response()->json([
                'message'=>'Booking Updated',
                'booking'=>$booking
            ],200);

          }

            
      }

       function destroy($booking_id)
         {
            $booking=RestBooking::find($booking_id);

            if(!$booking)
                {
                    return response()->json([
                        'message'=>'Booking Not Found'
                    ],404);
                }
              else{
                $booking->delete();
              }

              return response()->json([
                'message'=>'Booking Deleted'
              ]);
          }

          
}