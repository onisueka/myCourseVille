<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class BooksController extends BaseController
{
    function lists () {
        $resultDatas = DB::table('books')
        ->select(
            'books.*',
            'authors.first_name as author_first_name',
            'authors.last_name as author_last_name'
        )
        ->join('authors', 'authors.author_id', 'books.author_id')
        ->get();

        foreach($resultDatas as $item):
            $tagArray = json_decode($item->tag_ids, true) ?? [];
            $item->tags = DB::table('tags')->whereIn('tag_id', $tagArray)->get();
        endforeach;

        return response()->json($resultDatas);
    }
}
