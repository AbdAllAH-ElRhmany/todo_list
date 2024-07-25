import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
// import './TaskForm.css';

Modal.setAppElement('#root');

const TaskForm = ({ modalIsOpen, setModalIsOpen, fetchTasks, taskToEdit }) => {
    const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
    const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(taskToEdit ? taskToEdit.category_id : '');
    const [status, setStatusId] = useState(taskToEdit ? taskToEdit.status : '');

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:8002/public/api/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            status,
            category_id: categoryId
        };

        if (taskToEdit) {
            await axios.put(`http://localhost:8002/public/api/tasks/${taskToEdit.id}`, taskData);
        } else {
            await axios.post('http://localhost:8002/public/api/tasks', taskData);
        }
        fetchTasks();
        setModalIsOpen(false);
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal">
            <div className="modal-content">
                <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
                <form onSubmit={handleSubmit}>
                        <input className='input' type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input className='input' type="text" value={description} placeholder="Task Desc" onChange={(e) => setDescription(e.target.value)}/>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select value={status} onChange={(e) => setStatusId(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    <button className="btn" type="submit">Submit</button>
                </form>
            </div>
        </Modal>
    );
};

export default TaskForm;
