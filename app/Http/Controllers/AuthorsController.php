<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class AuthorsController extends BaseController
{
    function lists () {
        $resultDatas = DB::table('authors')
        ->get();

        return response()->json($resultDatas);
    }
}
