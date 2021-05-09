import React, {useState, ChangeEvent, KeyboardEvent} from 'react'
import {FilterValueTypes, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
  changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
  changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {


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

  const addTask = (title: string) => {
    props.addTask(title, props.todoListID)
  }

  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


  const elementsLi = props.tasks.map((t) => {

      const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(t.id, title, props.todoListID)
      }

      return (
        <li className={t.isDone ? 'is-done' : ''} key={t.id}>
          <Checkbox
            color="primary"
            checked={t.isDone}
            onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)}/>
          <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
          <IconButton color={'secondary'} onClick={() => {props.removeTask(t.id, props.todoListID)}}>
            <DeleteIcon />
          </IconButton>
        </li>)
    }
  )

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <IconButton color={'secondary'} onClick={onClickRemoveTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {elementsLi}
      </ul>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                onClick={onClickAllFilter}>All
        </Button>
        <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                onClick={onClickActiveFilter}>Active
        </Button>
        <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                onClick={onClickCompletedFilter}>Completed
        </Button>
      </div>
    </div>
  )
}

export default TodoList