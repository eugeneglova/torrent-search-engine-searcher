<?php

class EngineController extends \BaseController {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        // $engines = Engine::where('enabled', 1)
        //     ->join('site', 'site.site_id', '=', 'ss2_sites.d_id')
        //     ->where('site.search_engine', 1)->get();

        $engines = Engine::hasConstraint('site', function($query, $table) {
           $query->where($table . '.search_engine', 1);
        })->where('enabled', 1)->get();

        // $engines = Engine::where('enabled', 1)->get();
        // dd(DB::getQueryLog());

        return Response::json($engines->toArray(), 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}
