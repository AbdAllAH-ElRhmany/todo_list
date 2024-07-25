<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        return response()->json($this->taskRepository->getAll());
    }

    public function store(Request $request)
    {
        $task = $this->taskRepository->create($request->all());
        return response()->json($task, 201);
    }

    public function show($id)
    {
        return response()->json($this->taskRepository->getById($id));
    }

    public function update(Request $request, $id)
    {
        $task = $this->taskRepository->update($id, $request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $this->taskRepository->delete($id);
        return response()->json(null, 204);
    }

    public function restore($id)
    {
        $this->taskRepository->restore($id);
        return response()->json(null, 204);
    }

    public function pagination(Request $request, $type, $field, int $offset, int $limit)
    {
        return response()->json($this->taskRepository->pagination($type, $field, $offset, $limit, $request->all()));
    }
}

