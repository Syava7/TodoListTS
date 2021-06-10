import React, {ChangeEvent, useCallback} from 'react';
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

const Task = React.memo(({
                           task,
                           todoListID,
                           removeTask,
                           changeTaskStatus,
                           changeTaskTitle
                         }: TaskPropsType) => {

  const changeTaskTitleHandler = useCallback((title: string) => {
    changeTaskTitle(task.id, title, todoListID)
  }, [task.id, todoListID, changeTaskTitle])

  const removeTaskHandler = useCallback(() => {
    removeTask(task.id, todoListID)
  }, [removeTask, task.id, todoListID])

  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(task.id, e.currentTarget.checked, todoListID)
  }, [changeTaskStatus, task.id, todoListID])

  return (
    <div className={task.isDone ? 'is-done' : ''} key={task.id}>
      <Checkbox
        color="primary"
        checked={task.isDone}
        onChange={changeTaskStatusHandler}/>
      <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
      <IconButton color={'secondary'} onClick={removeTaskHandler}>
        <DeleteIcon/>
      </IconButton>
    </div>
  )
})

export default Task