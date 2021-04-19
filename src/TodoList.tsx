import React, {useState, ChangeEvent, KeyboardEvent} from 'react'
import {FilterValueTypes, TaskType} from './App';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValueTypes
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValueTypes) => void
}

function TodoList(props: TodoListPropsType) {

  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)

  const onClickAddTask = () => {
    if (title.trim()) {
      props.addTask(title)
    } else {
      setError(true)
    }
    setTitle('')
  }


  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }

  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }

  const onClickAllFilter = () => {
    props.changeFilter('all')
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input className={error ? 'error' : ''}
               value={title}
               placeholder={error ? 'Title required' : ''}
               onChange={onChangeInput}
               onKeyPress={onKeyPressAddTask}/>
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((t) => <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {
              props.removeTask(t.id)
            }}>Delete
            </button>
          </li>)
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilter}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => {
          props.changeFilter('active')
        }}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={() => {
          props.changeFilter('completed')
        }}>Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList