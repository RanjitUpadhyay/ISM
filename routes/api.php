<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployeeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Student
Route::get('/students',[StudentController::class,'index']);
Route::post('/students',[StudentController::class,'store']);
Route::get('/students/{id}',[StudentController::class,'show']);  //writing {$id} is wrong
Route::put('/students/{id}',[StudentController::class,'update']);
Route::delete('/students/{id}',[StudentController::class,'destroy']);

//Employee
Route::post('/employees',[EmployeeController::class,'store']);