<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $table='candidates';
    protected $fillable=['name','email','phone','city','gender'];
}
