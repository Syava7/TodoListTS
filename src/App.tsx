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

    const taskToBuy: Array<TaskType> = [
        { id: 4, isDone: true, title: 'ReactHooks'},
        { id: 5, isDone: true, title: 'CSS3'},
        { id: 6, isDone: false, title: 'VUE3'} //// dsjjcldjfld
    ]

    return (
        <div className="App">
           <TodoList title={'Hello word'}
                     tasks={ taskToLearn }/>
           <TodoList title={'Hello word'}
                     tasks={ taskToBuy }/>
        </div>
    );
}

export default App;
