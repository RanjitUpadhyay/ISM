<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    function index()
    {
        $clients=Client::all();
        return response()->json($clients);
    }

    function store(Request $request)
    {
        $client=Client::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'city'=>$request->city,
            'gender'=>$request->gender
        ]);

        return response()->json([
            'message'=>'Client Created Successfully',
            'client'=>$client
        ],201);
    }

    function show($id)
    {
        $client=Client::find($id);

        if(!$client)
            {
                return response()->json([
                    'message'=>'Client Not Found',
                ],404);
            }
            else{
                return response()->json($client);
            }
    }


    function update(Request $request,$id)
    {
        $client=Client::find($id);

        if(!$client)
            {
                return response()->json([
                    'message'=>'Client Not Found',
                ],404);
            }
            else
                {
                    $client->update([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'city'=>$request->city,
                    'gender'=>$request->gender
                    ]);
                }
                return response()->json([
                    'message'=>'Client Upadated',
                    'client'=>$client
                ],200);
    }

    function destroy($id)
    {
        $client=Client::find($id);

        if(!$client)
            {
                return response()->json([
                    'message'=>'Client Not Found',
                    'client'=>$client
                ],404);
            }
            else{
                $client->delete();
                return response()->json([
                    'message'=>'Client Deleted',
                    
                ]);
            }
    }
}
