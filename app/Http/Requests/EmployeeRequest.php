<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;                                         // earlier here :return false was present; 
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [                                                      //write here validation rules
        //DB table column names
        'first_name'=>'required|max:100',
        'last_name'=>'required|max:100',
        'email'=>'required|email|unique:employees,email',
        'phone'=>'required|digits:10',
        'city'=>'required',
        'course'=>'required',
        'gender'=>'required|in:Male,Female'
        ];
    }
}
