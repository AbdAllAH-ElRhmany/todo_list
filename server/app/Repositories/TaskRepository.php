<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository implements RepositoryInterface
{
    public function getAll()
    {
        return Task::all()->load('category');
    }

    public function getById($taskId)
    {
        return Task::find($taskId)->load('category');
    }

    public function create(array $taskDetails)
    {
        return Task::create($taskDetails);
    }

    public function update($taskId, array $newDetails)
    {
        return Task::whereId($taskId)->update($newDetails);
    }

    public function delete($taskId)
    {
        return Task::find($taskId)->delete();
    }

    public function restore($taskId)
    {
        return Task::withTrashed()->find($taskId)->restore();
    }

    public function pagination($type, $field, int $offset, int $limit, array $settings = [])
    {

        if (!empty($settings['title'])) {
            $query = Task::where(function ($query) use ($settings) {
                $query->where('title', 'like', '%' . $settings['title'] . '%')
                    ->orWhere('description', 'like', '%' . $settings['title'] . '%');
            });
        } else {
            $query = Task::query();
        }

        if (!empty($settings['status'])) {
            $query->where('status', $settings['status']);
        }

        $tasks = $query->orderBy($field, $type)
            ->offset(($offset - 1) * $limit)
            ->limit($limit)
            ->get()
            ->load('category');

        $total = $query->count();

        return response()->json([
            'data' => $tasks,
            'current_page' => $offset,
            'last_page' => ceil($total / $limit)
        ]);
        if(!empty($settings['title'])){
//            dd(Task::where('title', 'like', '%' . $settings['title'] . '%')->orderBy($field, $type)->offset($offset)->limit($limit)->toSql());
            return Task::where(function ($query) use ($settings) {
                $query->where('title', 'like', '%' . $settings['title'] . '%')
                    ->orWhere('description', 'like', '%' . $settings['title'] . '%');
            })
                ->orderBy($field, $type)
                ->offset($offset)
                ->limit($limit)
                ->get()
                ->load('category');
        }
        return Task::orderBy($field, $type)->offset($offset)->limit($limit)->get()->load('category');
    }

}
