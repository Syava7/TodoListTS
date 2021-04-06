import React from 'react'
import {FilterValueTypes, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValueTypes) => void
}

function TodoList(props:TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => <li key={t.id}>
                        <input type='checkbox' checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)} }>Delete</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() =>{props.changeFilter('all')}}>All</button>
                <button onClick={() =>{props.changeFilter('active')}}>Active</button>
                <button onClick={() =>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList