import React, {useState} from 'react';
import s from './App.module.css'
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export type TaskType = {
  id: string,
  isDone: boolean,
  title: string
}

export type FilterValueTypes = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueTypes
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const todoListID_3 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'},
    {id: todoListID_3, title: 'What to spend', filter: 'all'},
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListID_1]: [
      {id: v1(), isDone: true, title: 'React'},
      {id: v1(), isDone: true, title: 'CSS'},
      {id: v1(), isDone: false, title: 'VUE'},
    ],
    [todoListID_2]: [
      {id: v1(), isDone: true, title: 'Milk'},
      {id: v1(), isDone: true, title: 'Meat'},
      {id: v1(), isDone: false, title: 'Water'},
    ],
    [todoListID_3]: [
      {id: v1(), isDone: true, title: 'Money'},
      {id: v1(), isDone: true, title: 'Time'},
      {id: v1(), isDone: false, title: 'Nervous'},
    ],
  })

  function removeTask(id: string, todoListID: string) {
    tasks[todoListID] = tasks[todoListID].filter((t) => t.id !== id)
    setTasks({...tasks})
  }

  function addTask(title: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }

  function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((t) => t.id === taskID
        ? {...t, isDone: newIsDoneValue}
        : t)
    })
  }

  function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((t) => t.id === taskID
        ? {...t, title: newTitle}
        : t)
    })
  }


  function removeTodoList(todoListID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
  }

  function changeFilter(value: FilterValueTypes, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID
      ? {...tl, filter: value}
      : tl))
  }

  function changeTodoListTitle(title: string, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID
      ? {...tl, title: title}
      : tl))
  }

  function addTodoList(title: string) {
    const newTodoListID = v1()
    const newTodoList: TodoListType = {id: newTodoListID, title, filter: 'all'}
    setTodoLists([...todoLists, newTodoList])
    setTasks({...tasks, [newTodoListID]: []})
  }


  function getTasksForTodoList(todoList: TodoListType) {
    switch (todoList.filter) {
      case 'active':
        return tasks[todoList.id].filter((t) => !t.isDone)
      case 'completed':
        return tasks[todoList.id].filter((t) => t.isDone)
      default:
        return tasks[todoList.id]
    }
  }

  const todoListsComponents = todoLists.map(tl => {
    return (
      <Grid item xs={4} key={tl.id}>
        <Paper className={s.todoWrap} elevation={3}>
          <TodoList title={tl.title}
                    tasks={getTasksForTodoList(tl)}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                    todoListID={tl.id}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'space-between'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6">
            Todolist
          </Typography>
          <Button color="inherit" variant={'outlined'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container className={s.addItemFormWrap}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoListsComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
