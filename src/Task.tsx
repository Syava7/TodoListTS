import React, {useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@material-ui/icons/Delete';
import {TaskType} from './AppWithRedux';

type TaskPropsType = {
  task: TaskType
  todoListID: string
  removeTask: (taskId: string, todoListID: string) => void
  changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

const Task = React.memo((props:TaskPropsType) => {

  const changeTaskTitle = useCallback((title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todoListID)
  }, [props.task.id, props.todoListID, props.changeTaskTitle])



  return (
    <div className={props.task.isDone ? 'is-done' : ''} key={props.task.id}>
      <Checkbox
        color="primary"
        checked={props.task.isDone}
        onChange={(e) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)}/>
      <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
      <IconButton color={'secondary'} onClick={() => {props.removeTask(props.task.id, props.todoListID)}}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
})

export default Task