import React from 'react';
import TaskList from './Components/TaskList';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="container">
                <h1 className='app_title'>To-Do List</h1>
                <TaskList />
            </div>
        </div>
    );
}

export default App;
