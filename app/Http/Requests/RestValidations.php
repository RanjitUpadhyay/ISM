<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RestValidations extends FormRequest
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
        return [//table RestBooking
             // rest_booking
             'name' => 'required|min:3|max:20',
             'phone' => 'required|digits:10|unique:rest_booking,phone',   //'email' => 'required|email|unique:rest_booking,email',
             'booking_date' => 'required|date|after_or_equal:today',
             'table_no' => 'required|integer|unique:rest_booking,table_no',
 
             // rest_payment
             'payment_mode' => 'required|in:cash,upi,card,net_banking',
             'payment_status' => 'required|in:pending,paid',
             'total_bill' => 'required|numeric',
        ];
    }
}
