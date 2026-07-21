<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
//get all students
 function index()
 {
    $students=Student::all();
    return response()->json($students);
 }   

 //add new student
 function store(Request $request)
 {
    $student=Student::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'phone'=>$request->phone,
        'age'=>$request->age,
        'course'=>$request->course,
        'city'=>$request->city
    ]);
    return response()->json([
        'message'=>'Student saved successfully',
        'student'=>$student
    ],201);
 }
    //get a single student
    function show($id)
    {
        $student=Student::find($id);
          if(!$student)
        {
            return response()->json([
                'message'=>'Student not found'
            ],404);
        }
        return response()->json($student);
    }

    //update student

    function update(Request $request,$id)
    {
        $student=Student::find($id);
        if(!$student)
        {
            return response()->json([
                'message'=>'Student not found'
            ],404);
        }
        $student->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'age'=>$request->age,
            'course'=>$request->course,
            'city'=>$request->city
        ]);
        return response()->json([
            'message'=>'student updated successfully',
            'student'=>$student
        ],200);
    }

    //delete student

    function destroy($id)
    {
        $student=Student::find($id);

        if(!$student)
        {
            return response()->json([
                'message'=>'Student not found'
            ],404);
        }
        $student->delete();
        return response()->json([
            'message'=>'student deleted'
        ]);
    }
 }