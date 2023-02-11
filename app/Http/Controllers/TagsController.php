<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class TagsController extends BaseController
{
    function lists () {
        $resultDatas = DB::table('tags')
        ->get();

        return response()->json($resultDatas);
    }
}
