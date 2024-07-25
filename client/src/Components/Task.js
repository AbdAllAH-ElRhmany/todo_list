import React, { useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
// import './Task.css'; // استيراد ملف الأنماط

const Task = ({ task, fetchTasks }) => {
    const [hover, setHover] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const deleteTask = async () => {
        await axios.delete(`http://localhost:8002/public/api/tasks/${task.id}`);
        fetchTasks();
    };

    return (
        <p
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="task_item"
        >
            <span className="task_title">{task.title}</span>
            {hover && (
                <div className="task_buttons">
                    <button onClick={() => setModalIsOpen(true)}>Edit</button>
                    <button onClick={deleteTask}>Delete</button>
                </div>
            )}
            <TaskForm
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                fetchTasks={fetchTasks}
                taskToEdit={task}
            />
        </p>
    );
};

export default Task;
