<?php

namespace App\Http\Controllers;

use App\Http\Requests\HouseRequest;
use App\Models\House;

class HouseController extends Controller
{
    function index()
    {
        $houses=House::all();
        return response()->json($houses);
    }

    function store(HouseRequest $request)
    {
        $house=House::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city ,
            'gender'=>$request->gender 
            ]);

            return response()->json([
                'message'=>'House is Created',
                'house'=>$house
            ],201);
    }

    function show($id)
    {
        $house=House::find($id);
        if(!$house)
            {
                return response()->json([
                    'message'=>'House not Present',
                ],404);
            }
            else{
                return response()->json($house);
            }
    }

    function update(HouseRequest $request,$id)
    {
        $house=House::find($id);
        if(!$house)
            {
                return response()->json([
                    'message'=>'House not Present',
                ],404);
            }
            else{
                $house->update([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'phone'=>$request->phone,
                    'city'=>$request->city ,
                    'gender'=>$request->gender 
                ]);

                return response()->json([
                    'message'=>'House Updated',
                    'house'=>$house
                ],200);
            }

    }

            function destroy($id)
            {
                $house=House::find($id);

                if(!$house)
                    {
                        return response()->json([
                            'message'=>'House not Present',
                        ],404);
                    }

                    else{
                        $house->delete();
                        return response()->json([
                            'message'=>'House Deleted'
                        ]);
                    }

            }
    
}
