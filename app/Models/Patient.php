<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table='patients';
    protected $fillable=['name','email','phone','city','gender','age','bed_no','admit_date','discharge_date','disease'];
}
