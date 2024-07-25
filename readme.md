# Todo List

## Overview

This task is a simple web application that includes a Laravel backend with RESTfull APIs and a React frontend. The application features 
are CRUD on Task with CRUD on categories also.

you can access task's video on https://drive.google.com/file/d/1Rwn7LkNjQ34-B23NVxUkxkd3Ld7Uagmv/view?usp=sharing

## Features

- **Manage Tasks**: users can add, edit, and soft delete tasks.
- **Manage Categories**: users can add, edit, and delete categories.
- **Categorize Tasks**: attach every task with its category.
- **Real-time Updates**: Automatically update UI after successful operations using React and Django.

## Technologies Used

### Backend

- **Laravel**: A high-level PHP web framework.
- **MySQL**: For database management.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Hooks**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests.

## Installation

### Backend

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AbdAllAH-ElRhmany/todo_list.git
    cd your-repository/server
    ```

2. **Install Backend dependencies:**

    ```bash
    composer install
    ```


4. **Run the migrations:**

    ```bash
    php artisan migrate
    ```

5. **Start the development server:**

    ```bash
    php -S localhost:8002
    ```

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd your-repository/client
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

## Usage

1. **Access the web application:**

    Open `http://localhost:3000` in your browser to use the React frontend.

2. **API Endpoints:**

    - **GET /api/tasks/**: List all tasks.
    - **POST /api/tasks/**: Store task.
    - **PUT /api/tasks/{id}**: Edit Task.
    - **GET /api/tasks/{id}/**: Get details of a specific task.
    - **DELETE /api/tasks/{id}/**: Delete task.
    - **POST /api/tasks/{id}/restore**: Restore task.
    - **POST /api/tasks/pagination/{type}/{field}/{offset}/{limit}**: filter tasks and paginate it
   
    - **GET /api/categories/**: List all categories.
    - **POST /api/categories/**: Store category.
    - **PUT /api/categories/{id}**: Edit category.
    - **GET /api/categories/{id}/**: Get details of a specific category.
    - **DELETE /api/categories/{id}/**: Delete category.
    - **POST /api/categories/{id}/restore**: Restore category.


