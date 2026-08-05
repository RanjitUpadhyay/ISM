<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    function index()
    {
        $accounts=Account::all();
        return response()->json($accounts);
    }

    function store(Request $request)
    {
        $account=Account::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'city'=>$request->city,
            'gender'=>$request->gender
        ]);

        return response()->json([
            'message'=>'Account Created',
            'account'=>$account
        ],201);
    }

    function show($id)
    {
        $account=Account::find($id);
        if(!$account)
            {
                return response()->json([
                    'message'=>'Account Not Found'
                ],404);

            }
            else{
                return response()->json($account);
            }
    }

    function update(Request $request ,$id)
    {
        $account=Account::find($id);

        if(!$account)
            {
             return response()->json([
                'message'=>'Account Not Found'
             ],404);   
            }
            else
                {
                    $account->update([
                        'name'=>$request->name,
                        'email'=>$request->email,
                        'city'=>$request->city,
                        'gender'=>$request->gender
                    ]);

                   }
                   return response()->json([
                    'message'=>'Account Updated'
                ]);
    }    

    function destroy($id)
    {
       $account=Account::find($id);

       if(!$account)
        {
            return response()->json([
                'message'=>'Account Not Found'
            ],404);

        }
        else{
            $account->delete();
        }
        return response()->json([
       'message'=>'Account Deleted'
        ],200);    
    
    }
}
