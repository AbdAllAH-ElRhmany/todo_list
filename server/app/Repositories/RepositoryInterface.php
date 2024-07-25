<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function getAll();
    public function getById($taskId);
    public function create(array $taskDetails);
    public function update($taskId, array $newDetails);
    public function delete($taskId);
    public function restore($taskId);
}
