import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    isDone: boolean,
    title: string
}

function App() {
    let [tasks, setTasks] = useState([
        { id: 1, isDone: true, title: 'React'},
        { id: 2, isDone: true, title: 'CSS'},
        { id: 3, isDone: false, title: 'VUE'},
        { id: 4, isDone: false, title: 'JS'},
        { id: 5, isDone: false, title: 'Git'}
    ])

    function removeTask(id:number) {
       let filteredTasks = tasks.filter((t) => t.id !== id )
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <TodoList title={'Hello word'}
                      tasks={ tasks }
                      removeTask={ removeTask }
            />
        </div>
    );
}

export default App;
