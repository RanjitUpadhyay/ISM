<?php

namespace App\Http\Controllers;
use App\Models\Patient;

use App\Http\Requests\PatientRequest;

class PatientController extends Controller
{
   function index()
   {
    $patients=Patient::all();
    return response()->json($patients);
   }

   function store(PatientRequest $required)
   {
    $patient=Patient::create([
        'name'=>$required->name,
        'email'=>$required->email,
        'phone'=>$required->phone,
        'city'=>$required->city,
        'gender'=>$required->gender,
        'age'=>$required->age,
        'bed_no'=>$required->bed_no,
        'admit_date'=>$required->admit_date,
        'discharge_date'=>$required->discharge_date,
        'disease'=>$required->disease,
        
    ]);

    return response()->json([
        'message'=>'Patient Created',
        'patient'=>$patient
    ],201);
   }

   function show($id)
   {
    $patient=Patient::find($id);

    if(!$patient)
        {
            return response()->json([
                'message'=>'Patient Not Found'
            ],404);
        }

        else{
            return response()->json($patient);
        }
   }

   function update(PatientRequest $required,$id)
   {
    $patient=Patient::find($id);

    if(!$patient)
        {
            return response()->json([
                'message'=>'Patient Not Found'
            ],404);
        }

        else{
                $patient->update([
                'name'=>$required->name,
                'email'=>$required->email,
                'phone'=>$required->phone,
                'city'=>$required->city,
                'gender'=>$required->gender,
                'age'=>$required->age,
                'bed_no'=>$required->bed_no,
                'admit_date'=>$required->admit_date,
                'discharge_date'=>$required->discharge_date,
                'disease'=>$required->disease,
            ]);

            return response()->json([
                'message'=>'Patient Updated',
                'patient'=>$patient
            ],200);
        }
   }

   function destroy($id)
   {
    $patient=Patient::find($id);

    if(!$patient)
        {
            return response()->json([
                'message'=>'Patient Not Found'
            ],404);
        }

        else{
            $patient->delete();
            return response()->json([
                'message'=>'Patient Deleted'
            ]);
        }

   }
}
