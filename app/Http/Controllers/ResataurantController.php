<?php

namespace App\Http\Controllers;
use App\Models\Restaurant;

use App\Http\Requests\RestaurantRequest;

class ResataurantController extends Controller
{
    function index()
    {
        $customers=Restaurant::all();
        return response()->json($customers);
    }

    function store(RestaurantRequest $request)
    {
        $customer=Restaurant::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'booking_date'=>$request->booking_date,
            'table_no'=>$request->table_no,
            'table_status'=>$request->table_status,
            'booking_status'=>$request->booking_status,
            'payment_mode'=>$request->payment_mode,
            'payment_status'=>$request->payment_status,
            'total_bill'=>$request->total_bill
        ]);

        return response()->json([
            'message'=>'Status Created',
            'customer'=>$customer
        ],201);
    }

    function show($id)
    {
        $customer=Restaurant::find($id);

        if(!$customer)
            {
                return response()->json([
                    'message'=>'Customer Not Found'
                ],404);
            }

            else{
                return response()->json($customer);
            }
    }

    function update(RestaurantRequest $request,$id)
    {
        $customer=Restaurant::find($id);

        if(!$customer)
            {
                return response()->json([
                    'message'=>'Customer Not Found'
                ]);
            }

            else{
               $customer-> update([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'booking_date'=>$request->booking_date,
            'table_no'=>$request->table_no,
            'table_status'=>$request->table_status,
            'booking_status'=>$request->booking_status,
            'payment_mode'=>$request->payment_mode,
            'payment_status'=>$request->payment_status,
            'total_bill'=>$request->total_bill
                ]);
            }

            {
                return response()->json([
                    'message'=>'Customer Updated',
                    'customer'=>$customer
                ],200);
            }
    }

    function destroy($id)
    {
        $customer=Restaurant::find($id);
        if(!$customer)
            {
                return response()->json([
                    'message'=>'Customer Not Found'
                ],404);
            }

            else{
                $customer->delete();
                return response()->json([
                    'message'=>'Customer Deleted'
                ]);
            }
    }
}
