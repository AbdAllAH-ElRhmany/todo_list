<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CategoryRepository;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        return response()->json($this->categoryRepository->getAll());
    }

    public function store(Request $request)
    {
        $task = $this->categoryRepository->create($request->all());
        return response()->json($task, 201);
    }

    public function show($id)
    {
        return response()->json($this->categoryRepository->getById($id));
    }

    public function update(Request $request, $id)
    {
        $task = $this->categoryRepository->update($id, $request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $this->categoryRepository->delete($id);
        return response()->json(null, 204);
    }

    public function restore($id)
    {
        $this->categoryRepository->restore($id);
        return response()->json(null, 204);
    }
}

