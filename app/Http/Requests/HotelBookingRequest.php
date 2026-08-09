<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class HotelBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [  //booking table 
            'name'            => 'required|min:3|max:50',
            'gender'          => 'required',
            'email'           => 'required|email',
            'phone'           => 'required|digits:10',
            'room_no'         => 'required',
            'room_type'       => 'required',
            'check_in'        => 'required|date|after_or_equal:today',
            'check_out'       => 'required|date|after_or equal:check_in',
            'booking_status'  => 'required',

               //payment table
            'payment_mode'    => 'required',
            'payment_status'  => 'required',
            'total_amount'    => 'required'
        ];
        
    }
}
