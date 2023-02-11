<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class BookController extends BaseController
{
    function list() {

        $bookData = DB::table('books')
        ->select(
            'books.*',
            'authors.first_name as author_first_name',
            'authors.last_name as author_last_name'
        )
        ->join('authors', 'authors.author_id', '=', 'books.author_id')
        ->get();

        foreach($bookData as $item) {
            $tagIds =  json_decode($item->tag_ids);
            if($tagIds) {
                $item->tags = DB::table('tags')->whereIn('tag_id', $tagIds)->get();
            } else {
                $item->tags = [];
            }
        }
        return response()->json($bookData);
    }
    
}