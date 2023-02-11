<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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

    function create (Request $request) {
        $tags = $request->input('tags', []);
        $tagDatas = [];
        foreach($tags as $item):
            $tagDatas[] = $item['tag_id'];
        endforeach;

        DB::table('books')->insert([
            'title' => $request->input('title', null),
            'author_id' => $request->input('author', null),
            'price' => $request->input('price', 0),
            'tag_ids' => json_encode($tagDatas)
        ]);

        return response()->json([
            "message" => "book record created"
        ], 201);
    }
}
