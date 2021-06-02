import {FilterValueTypes, TasksStateType, TaskType, TodoListType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodolistAT} from './todolists-reducer';

export type RemoveTaskAT = {
  type: 'REMOVE_TASK'
  taskId: string
  todoListID: string
}

export type AddTaskAT = {
  type: 'ADD_TASK'
  title: string
  todoListID: string
}

export type ChangeTaskStatusAT = {
  type: 'CHANGE_TASK_STATUS'
  taskID: string
  isDone: boolean
  todoListID: string
}

export type ChangeTaskTitleAT = {
  type: 'CHANGE_TASK_TITLE'
  taskID: string
  title: string
  todoListID: string
}


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].filter(t => t.id != action.taskId)
      }
    case 'ADD_TASK':
      let task: TaskType = {id: v1(), isDone: false, title: action.title}
      return {
        ...state,
        [action.todoListID]: [task, ...state[action.todoListID]]
      }
    case 'CHANGE_TASK_STATUS':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(task => {
          if (task.id === action.taskID) {
            return {...task, isDone: action.isDone}
          }
          else {
              return task
            }
        })
      }
    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(task => {
          if (task.id === action.taskID) {
            return {...task, title: action.title}
          }
          else {
            return task
          }
        })
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todoListID]: []
      }
    case 'REMOVE-TODOLIST':
      let copyState = {...state}
      delete copyState[action.todoListID]
      return copyState
    default:
      throw new Error('Error')
  }
}

export const removeTasksAC = (taskId: string, todoListID: string): RemoveTaskAT => {
  return {
    type: 'REMOVE_TASK', taskId, todoListID: todoListID
  }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
  return {
    type: 'ADD_TASK', title, todoListID
  }
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
  return {
    type: 'CHANGE_TASK_STATUS', taskID, isDone, todoListID
  }
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
  return {
    type: 'CHANGE_TASK_TITLE', taskID, title, todoListID
  }
}