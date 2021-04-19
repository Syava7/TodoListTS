import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

export type FilterValueTypes = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), isDone: true, title: 'React'},
        { id: v1(), isDone: true, title: 'CSS'},
        { id: v1(), isDone: false, title: 'VUE'},
        { id: v1(), isDone: false, title: 'JS'},
        { id: v1(), isDone: false, title: 'Git'}
    ])

    function removeTask(id: string) {
       let filteredTasks = tasks.filter((t) => t.id !== id )
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
      const newTask: TaskType = {
        id: v1(),
        title,
        isDone:false
      }
      setTasks([newTask,...tasks])
    }



    let [filter, setFilter] = useState<FilterValueTypes>('all')
    let taskForTodolist = tasks

    switch (filter) {
        case 'active':
            taskForTodolist = tasks.filter((t) => !t.isDone)
            break;
        case 'completed':
            taskForTodolist = tasks.filter((t) => t.isDone)
            break;
    }

    function changeFilter(value: FilterValueTypes) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList title={'Hello word'}
                      tasks={ taskForTodolist }
                      removeTask={ removeTask }
                      changeFilter={changeFilter}
                      addTask={addTask}
                      filter={filter}
            />
        </div>
    );
}

export default App;
