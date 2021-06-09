import React, {useCallback} from 'react'
import {FilterValueTypes, TaskType} from './AppWithRedux';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Task from './Task';


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

const TodoList = React.memo((props: TodoListPropsType) => {
  console.log('todo')

  const getTasksForTodoList = () => {
    switch (props.filter) {
      case 'active':
        return props.tasks.filter((t) => !t.isDone)
      case 'completed':
        return props.tasks.filter((t) => t.isDone)
      default:
        return props.tasks
    }
  };

  let newTasks = getTasksForTodoList()

  const onClickRemoveTodolist = () => props.removeTodoList(props.todoListID)

  const onClickAllFilter = useCallback(() => {
    props.changeFilter('all', props.todoListID)
  }, [props.changeFilter, props.todoListID])

  const onClickActiveFilter = useCallback(() => {
    props.changeFilter('active', props.todoListID)
  }, [props.changeFilter, props.todoListID])

  const onClickCompletedFilter = useCallback(() => {
    props.changeFilter('completed', props.todoListID)
  }, [props.changeFilter, props.todoListID])

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todoListID)
  }, [props.addTask, props.todoListID])

  const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID), [props.changeTodoListTitle, props.todoListID])


  const elements = newTasks.map((t) => {

     return (
       <Task task={t}
             key={t.id}
             todoListID={props.todoListID}
             removeTask={props.removeTask}
             changeTaskStatus={props.changeTaskStatus}
             changeTaskTitle={props.changeTaskTitle} />
     )

    })


  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <IconButton color={'secondary'} onClick={onClickRemoveTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <div>
        {elements}
      </div>
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
})

export default TodoList