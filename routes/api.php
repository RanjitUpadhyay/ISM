<?php
//use\Http\Requests\ApplicantRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ContactController;
use App\http\Controllers\HouseController;
use App\http\Controllers\ShopController;
use App\http\Controllers\ApplicantController;
use App\http\Controllers\PatientController;
use App\Http\Controllers\ResataurantController;
use App\Http\Controllers\HotelBookingController;
use App\Http\Controllers\RestController;
use App\Http\Controllers\LodgeController;



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

//User
Route::get('/staff',[StaffController::class,'index']);
Route::post('/staff',[StaffController::class,'store']);
Route::get('/staff/{id}',[StaffController::class,'show']);
Route::put('/staff/{id}',[StaffController::class,'update']);
Route::delete('/staff/{id}',[StaffController::class,'destroy']);

//Client
Route::get('/client',[ClientController::class,'index']);
Route::post('/client',[ClientController::class,'store']);
Route::get('/client/{id}',[ClientController::class,'show']);
Route::put('/client/{id}',[ClientController::class,'update']);
Route::delete('/client/{id}',[ClientController::class,'destroy']);


//Profile
Route::get('/profile',[ProfileController::class,'index']);
Route::post('/profile',[ProfileController::class,'store']);
Route::get('/profile/{id}',[ProfileController::class,'show']);
Route::put('/profile/{id}',[ProfileController::class,'update']);
Route::delete('/profile/{id}',[ProfileController::class,'destroy']);

//Account
Route::get('/account',[AccountController::class,'index']);
Route::post('/account',[AccountController::class,'store']);
Route::get('/account/{id}',[AccountController::class,'show']);
Route::put('/account/{id}',[AccountController::class,'update']);
Route::delete('/account/{id}',[AccountController::class,'destroy']);

//Member
Route::get('/member',[MemberController::class,'index']);
Route::post('/member',[MemberController::class,'store']);
Route::get('/member/{id}',[MemberController::class,'show']);
Route::put('/member/{id}',[MemberController::class,'update']);
Route::delete('/member/{id}',[MemberController::class,'destroy']);

//Candidate
Route::get('/candidate',[CandidateController::class,'index']);
Route::post('/candidate',[CandidateController::class,'store']);
Route::get('/candidate/{id}',[CandidateController::class,'show']);
Route::put('/candidate/{id}',[CandidateController::class,'update']);
Route::delete('/candidate/{id}',[CandidateController::class,'destroy']);

//Contact
Route::get('/contact',[ContactController::class,'index']);
Route::post('/contact',[ContactController::class,'store']);
Route::get('/contact/{id}',[ContactController::class,'show']);
Route::put('/contact/{id}',[ContactController::class,'update']);
Route::delete('/contact/{id}',[ContactController::class,'destroy']);

//House

Route::get('/house',[HouseController::class,'index']);
Route::post('/house',[HouseController::class,'store']);
Route::get('/house/{id}',[HouseController::class,'show']);
Route::put('/house/{id}',[HouseController::class,'update']);
Route::delete('/house/{id}',[HouseController::class,'destroy']);

//Shop
Route::get('/shop',[ShopController::class,'index']);
Route::post('/shop',[ShopController::class,'store']);
Route::get('/shop/{id}',[ShopController::class,'show']);
Route::put('/shop/{id}',[ShopController::class,'update']);
Route::delete('/shop/{id}',[ShopController::class,'destroy']);

//Applicant
Route::get('/applicant',[ApplicantController::class,'index']);
Route::post('/applicant',[ApplicantController::class,'store']);
Route::get('/applicant/{id}',[ApplicantController::class,'show']);
Route::put('/applicant/{id}',[ApplicantController::class,'update']);
Route::delete('/applicant/{id}',[ApplicantController::class,'destroy']);

//Patient
Route::get('/patient',[PatientController::class,'index']);
Route::post('/patient',[PatientController::class,'store']);
Route::get('/patient/{id}',[PatientController::class,'show']);
Route::put('/patient/{id}',[PatientController::class,'update']);
Route::delete('/patient/{id}',[PatientController::class,'destroy']);

//Restaurant
Route::get('/restaurant',[ResataurantController::class,'index']);
Route::post('/restaurant',[ResataurantController::class,'store']);
Route::get('/restaurant/{id}',[ResataurantController::class,'show']);
Route::put('/restaurant/{id}',[ResataurantController::class,'update']);
Route::delete('/restaurant/{id}',[ResataurantController::class,'destroy']);

//Hotel
Route::get('/hotel-bookings', [HotelBookingController::class, 'index']);

Route::post('/hotel-bookings', [HotelBookingController::class, 'store']);

Route::get('/hotel-bookings/{id}', [HotelBookingController::class, 'show']);

Route::put('/hotel-bookings/{id}', [HotelBookingController::class, 'update']);

Route::delete('/hotel-bookings/{id}', [HotelBookingController::class, 'destroy']);

//RestController-two tables
Route::get('/restbooking',[RestController::class,'index']);
Route::post('/restbooking',[RestController::class,'store']);
Route::get('/restbooking/{booking_id}',[RestController::class,'show']);
Route::put('/restbooking/{booking_id}',[RestController::class,'update']);
Route::delete('/restbooking/{booking_id}',[RestController::class,'destroy']);

//Lodge

Route::get('/lodgebooking',[LodgeController::class,'index']);
Route::post('/lodgebooking',[LodgeController::class,'store']);
Route::get('/lodgebooking/{booking_id}',[LodgeController::class,'show']);
Route::put('/lodgebooking/{booking_id}',[LodgeController::class,'update']);
Route::delete('/lodgebooking/{booking_id}',[LodgeController::class,'destroy']);