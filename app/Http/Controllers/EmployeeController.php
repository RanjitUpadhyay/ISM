<?php

namespace App\Http\Controllers;
use App\Models\Employee;
use App\Http\Requests\EmployeeRequest;

class EmployeeController extends Controller
{
    public function store(EmployeeRequest $request)
    {    $employee=Employee ::create([
        'first_name'=>$request->first_name,
        'last_name'=>$request->last_name,
        'email'=>$request->email,
        'phone'=>$request->phone,
        'city'=>$request->city,
        'course'=>$request->course,
        'gender'=>$request->gender]);

       return response()->json([
          'message'=>'Employee Created Successfully',
          'employee'=>$employee
       ]);

    }
}
