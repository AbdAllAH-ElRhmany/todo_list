<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository implements RepositoryInterface
{
    public function getAll()
    {
        return Category::all();
    }

    public function getById($taskId)
    {
        return Category::find($taskId);
    }

    public function create(array $taskDetails)
    {
        return Category::create($taskDetails);
    }

    public function update($taskId, array $newDetails)
    {
        return Category::whereId($taskId)->update($newDetails);
    }

    public function delete($taskId)
    {
        return Category::find($taskId)->delete();
    }

    public function restore($taskId)
    {
        return Category::withTrashed()->find($taskId)->restore();
    }
}
