<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BooksController extends BaseController
{
    function lists (Request $request) {

        $sqlCommand = DB::table('books')
        ->select(
            'books.*',
            'authors.first_name as author_first_name',
            'authors.last_name as author_last_name'
        )
        ->join('authors', 'authors.author_id', 'books.author_id');

        if($request->input('title')) {
            $sqlCommand->where('books.title', 'like', "%".$request->input('title')."%");
        }
        if($request->input('price')) {
            $sqlCommand->where('books.price', $request->input('price'));
        }
        if($request->input('author')) {
            $sqlCommand->where('books.author_id', $request->input('author'));
        }

        $sqlDatas = $sqlCommand->get();

        $resultDatas = [];
        $tags = $request->input('tags', []);
        $tagDatas = [];
        foreach($tags as $item):
            $tagDatas[] = $item['tag_id'];
        endforeach;
        foreach($sqlDatas as $item):
            $tagArray = json_decode($item->tag_ids, true) ?? [];
            $item->tags = DB::table('tags')->whereIn('tag_id', $tagArray)->get();
            if(count($tagDatas) > 0):
                $hasTag = array_intersect($tagDatas, $tagArray);
                if(count($hasTag) > 0):
                    $resultDatas[] = $item;
                endif;
            else:
                $resultDatas[] = $item;
            endif;
        endforeach;

        return response()->json($resultDatas);
    }

    function getById ($id) {
        return DB::table('books')->where('book_id', $id)->first();
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

    function delete (Request $request) {

        DB::table('books')->where('book_id', '=', $request->input('book_id'))->delete();

        return response()->json([
            "message" => "book record delete"
        ], 204);
    }
}
