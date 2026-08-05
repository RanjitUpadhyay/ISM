<?php

namespace App\Http\Controllers;

use  App\Http\Requests\ShopRequest;
use App\Models\Shop;

class ShopController extends Controller
{
    function index()
    {
        $shops=Shop::all();
        return response()->json($shops);
    }

    function store(ShopRequest $request)
    {
        $shop=Shop::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender
        ]);

        return response()->json([
            'message'=>'Shop Created',
            'shop'=>$shop
        ],201);
    }

    function show($id)
    {
        $shop=Shop::find($id);
        if(!$shop)
            {
                return response()->json([
                    'message'=>'Shop Not Found'
                ],404);
            }

            else{
                return response()->json($shop);
            }
    }

    function update(ShopRequest $request,$id)
    {
        $shop=Shop::find($id);
        if(!$shop)
            {
                return response()->json([
                    'message'=>'Shop Not Found'
                ],404);
            }

            else{$shop->update([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'phone'=>$request->phone,
                    'city'=>$request->city,
                    'gender'=>$request->gender
                ]);
            }

            return response()->json([
                'message'=>'Shop Updated',
                'shop'=>$shop
            ],200);
    }

    function destroy($id)
    {
        $shop=Shop::find($id);
        if(!$shop)
            {
                return response()->json([
                    'message'=>'Shop Not Found'
                ],404);
            }

            else{
                $shop->delete();
              return response()->json([
                'message'=>'Shop Deleted'
              ]);
            }

    }
}
