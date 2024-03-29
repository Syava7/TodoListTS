import {AddTodolistAC, todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './task-reducer';
import {TasksStateType, TodoListType} from '../App';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = AddTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todoListID);
  expect(idFromTodolists).toBe(action.todoListID);
});
