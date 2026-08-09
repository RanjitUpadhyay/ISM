<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LodgeRequest extends FormRequest
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
        return [
            'name'=>'required|min:3|max:20',
            'gender'=>'required',
            'phone'=>'required|digits:10|unique:lodgeBooking,phone',
            'check_in'=>'required|after_or_equal:today',
            'check_out'=>'required|after_or_equal:check_in',
            'room_no'=>'required|unique:lodgeBooking,room_no',

            'payment_mode'=>'required',
            'payment_status'=>'required',
            'total_bill'=>'required|integer'
        ];
    }
}
/*
'room_no' => [
    'required',
    'integer',
    Rule::unique('lodgeBooking', 'room_no')
        ->ignore($this->route('booking_id'), 'booking_id')
],
*/

/*
'room_no' => [
    'required',
    'integer',
    Rule::unique('lodgeBooking', 'room_no')
        ->ignore($this->route('booking_id'), 'booking_id')
],
*/

/*
'email' => [
    'required',
    'email',
    Rule::unique('lodgeBooking', 'email')
        ->ignore($this->route('booking_id'), 'booking_id')
],
*/

