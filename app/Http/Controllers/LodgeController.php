<?php

namespace App\Http\Controllers;

use  App\Http\Requests\LodgeRequest;
use App\Models\LodgeBooking;
use App\Models\LodgePayment;

class LodgeController extends Controller
{
    function index()
    {
        $bookings=LodgeBooking::with('payment')->get();
        return response()->json($bookings);
    }

    function store(LodgeRequest $req)
    {
        $booking=LodgeBooking::create([
            'name'=>$req->name,
            'gender'=>$req->gender,
            'phone'=>$req->phone,
            'check_in'=>$req->check_in,
            'check_out'=>$req->check_out,
            'room_no'=>$req->room_no
        ]);

        LodgePayment::create([
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
        $booking=LodgeBooking::with('payment')->find($booking_id);

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

    function update(LodgeRequest $req,$booking_id)
    {
        $booking=LodgeBooking::with('payment')->find($booking_id);

        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

            else{
                $booking->update([
            'name'=>$req->name,
            'gender'=>$req->gender,
            'phone'=>$req->phone,
            'check_in'=>$req->check_in,
            'check_out'=>$req->check_out,
            'room_no'=>$req->room_no
                ]);

                $booking->payment()->update([
            'booking_id'=>$req->booking_id,
            'payment_mode'=>$req->payment_mode,
            'payment_status'=>$req->payment_status,
            'total_bill'=>$req->total_bill
                ]);
            }
            return response()->json([
                'message'=>'Booking Updated'
            ],200);

    }

          function destroy($booking_id)
            {
               $booking=LodgeBooking::find($booking_id);

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
                ],204);
            }

           
}
