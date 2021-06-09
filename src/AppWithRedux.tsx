import React, {useCallback} from 'react';
import s from './App.module.css'
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {RemoveTodoListAC, AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC} from './store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from './store/task-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './store/store';

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

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {



  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

  const dispatch = useDispatch()


  const removeTask = useCallback((id: string, todoListID: string) => {
    dispatch(removeTasksAC(id, todoListID))
  }, [dispatch]);

  const addTask = useCallback((title: string, todoListID: string) => {
    dispatch(addTaskAC(title, todoListID))
  }, [dispatch]);

  const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
    dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
  }, [dispatch]);

  const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
    dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
  }, [dispatch]);

  const removeTodoList = useCallback((todoListID: string) => {
    dispatch(RemoveTodoListAC(todoListID))
  }, [dispatch]);

  const changeFilter = useCallback((value: FilterValueTypes, todoListID: string) => {
    dispatch(ChangeTodoListFilterAC(value, todoListID))
  }, [dispatch]);

  const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
    dispatch(ChangeTodoListTitleAC(title, todoListID))
  }, [dispatch]);

  const addTodoList = useCallback((title: string) => {
    dispatch(AddTodoListAC(title))
  }, [dispatch])


  const todoListsComponents = todoLists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper className={s.todoWrap} elevation={3}>
          <TodoList title={tl.title}
                    tasks={tasks[tl.id]}
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
            TodoList
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

export default AppWithRedux;
