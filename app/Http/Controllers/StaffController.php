<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    function index()
    {
        $staffs=Staff::all();
        return response()->json($staffs);
    }

    function store(Request $request)
    {
        $staff=Staff:: create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender
        ]);

        return response()->json([
            'message'=>'Staff Created Successfully',
            'staff'=>$staff
        ],201);
    }

    public function show($id)
    {
        $staff = Staff::find($id);
    
        if (!$staff) {
            return response()->json([
                'message' => 'Staff Not Found'
            ], 404);
        } else {
    
            return response()->json($staff);
        }
    }

    public function update(Request $request, $id)
    {
        $staff = Staff::find($id);
    
        if (!$staff) {
            return response()->json([
                'message' => 'Staff Not Found'
            ], 404);
        } else {
    
            $staff->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'city' => $request->city,
                'gender' => $request->gender
            ]);
    
            return response()->json([
                'message' => 'Staff Updated Successfully',
                'staff' => $staff
            ], 200);
        }
    }
    
    public function destroy($id)
    {
        $staff = Staff::find($id);
    
        if (!$staff) {
            return response()->json([
                'message' => 'Staff Not Found'
            ], 404);
        } else {
    
            $staff->delete();
    
            return response()->json([
                'message' => 'Staff Deleted Successfully'
            ]);
        }
    }
}
