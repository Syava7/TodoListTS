import React, {useState, ChangeEvent, KeyboardEvent} from 'react'
import {FilterValueTypes, TaskType} from './App';

type TodoListPropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueTypes
  addTask: (title: string, todoListID: string) => void
  removeTask: (taskId: string, todoListID: string) => void
  changeFilter: (value: FilterValueTypes, todoListID: string) => void
  changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)

  const onClickAddTask = () => {
    if (title.trim()) {
      props.addTask(title, props.todoListID)
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

  const onClickRemoveTodolist = () => props.removeTodoList(props.todoListID)

  const onClickAllFilter = () => {
    props.changeFilter('all', props.todoListID)
  }

  const onClickActiveFilter = () => {
    props.changeFilter('active', props.todoListID)
  }

  const onClickCompletedFilter = () => {
    props.changeFilter('completed', props.todoListID)
  }

  const elementsLi = props.tasks.map((t) => (
    <li className={t.isDone ? 'is-done' : ''} key={t.id}>
      <input
        type="checkbox"
        checked={t.isDone}
        onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)}/>
      <span>{t.title}</span>
      <button
        onClick={() => {
          props.removeTask(t.id, props.todoListID)
        }}>
        Delete
      </button>
    </li>))


  return (
    <div>
      <h3>{props.title}
        <button onClick={onClickRemoveTodolist}>x</button>
      </h3>
      <div>
        <input className={error ? 'error' : ''}
               value={title}
               placeholder={error ? 'Title required' : ''}
               onChange={onChangeInput}
               onKeyPress={onKeyPressAddTask}/>
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
        {elementsLi}
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onClickAllFilter}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onClickActiveFilter}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={onClickCompletedFilter}>Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList