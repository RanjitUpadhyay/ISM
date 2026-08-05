<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\ContactRequest;



class ContactController extends Controller
{
    function index()
    {
        $contacts=Contact::all();
        return response()->json($contacts);
    }

    function store(ContactRequest $request)
    {
        $contact=Contact::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender
        ]);

        return response()->json([
            'message'=>'Contact Created',
            'contact'=>$contact
        ],201);
    }

    function show($id)
    {
      $contact=Contact::find($id);
      if(!$contact)
        {
            return response()->json([
                'message'=>'Contact Not Found'
            ],404);
        }
        else{
            return response()->json($contact);
        }
    }

    function update(ContactRequest $request,$id)
    {
        $contact=Contact::find($id);

        if(!$contact)
            {
                return response()->json([
                    'message'=>'Contact Not Found'
                ],404);
            }
            else{
             $contact->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender
                ]);

                return response()->json([
                    'message'=>'Contact Updated',
                    'contact'=>$contact
                ],200);
            }

    }

            function destroy($id)
            {
                $contact=Contact::find($id);

                if(!$contact)
                    {
                        return response()->json([
                            'message'=>'Contact Not Found'
                        ],404);
                    }

                    else{
                        $contact->delete();

                        return response()->json([
                            'message'=>'Contact deleted'
                        ],204);
                    }
            }

    
   
}
