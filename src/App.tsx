import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    isDone: boolean,
    title: string
}

function App() {
    const taskToLearn: Array<TaskType> = [
        { id: 1, isDone: true, title: 'React'},
        { id: 2, isDone: true, title: 'CSS'},
        { id: 3, isDone: false, title: 'VUE'}
    ]

    return (
        <div className="App">
           <TodoList title={'Hello word'}
                     tasks={ taskToLearn }/>
        </div>
    );
}

export default App;
