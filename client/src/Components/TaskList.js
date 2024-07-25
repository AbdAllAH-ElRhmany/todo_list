import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';
import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const [taskStatus, setTaskStatus] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.post(`http://localhost:8002/public/api/tasks/pagination/${sortOrder}/id/${currentPage}/4`, {
                title: searchTerm,
                status: taskStatus
            });
            setTasks(response.data.original.data || []);
            setPageCount(response.data.last_page);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    }, [currentPage, searchTerm, sortOrder, taskStatus]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handlePageClick = (data) => {
        console.log(data)
        setCurrentPage(data.selected);

    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(0);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setCurrentPage(0);
    };

    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
        setCurrentPage(0);
    };

    return (
        <div className="task-list-container">
            <div className="tasks_options">
                <button className='input btn' onClick={() => setModalIsOpen(true)}>Add Task</button>
                <select className='input' onChange={handleSortChange} value={sortOrder}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select className='input' onChange={handleStatusChange} value={taskStatus}>
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
                <div className="search_form">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="task_list">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <Task key={task.id} task={task} fetchTasks={fetchTasks} setTaskToEdit={setTaskToEdit} setModalIsOpen={setModalIsOpen} />
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
            <div className="pagination">
                <button className='input btn' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className='input btn' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount - 1}>Next</button>
            </div>
            <TaskForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} fetchTasks={fetchTasks} taskToEdit={taskToEdit} />
        </div>
    );
};

export default TaskList;
