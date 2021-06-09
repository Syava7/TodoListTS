import {FilterValueTypes, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistAT = {
  type: 'REMOVE-TODOLIST'
  todoListID: string
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
  todoListID: string
}

type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  title: string
  todoListID: string
}

type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  value: FilterValueTypes
  todoListID: string
}

export const todoListID_1 = v1()
export const todoListID_2 = v1()
export const todoListID_3 = v1()

export type ActionType = RemoveTodolistAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

let initialState: Array<TodoListType> = []

export const todoListsReducer = (todoLists = initialState , action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListID)
    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {id: action.todoListID,  title: action.title, filter: 'all'}
      return [...todoLists, newTodoList]
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.todoListID
        ? {...tl, title: action.title}
        : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.todoListID
        ? {...tl, filter: action.value}
        : tl)
    default:
      return todoLists
  }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistAT => {
  return {
    type: 'REMOVE-TODOLIST', todoListID
  }
}

export const AddTodoListAC = (title: string): AddTodoListAT  => {
  return {
    type: 'ADD-TODOLIST', title, todoListID: v1()
  }
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
  return {
    type: 'CHANGE-TODOLIST-TITLE', title, todoListID
  }
}

export const ChangeTodoListFilterAC = (value: FilterValueTypes, todoListID: string): ChangeTodoListFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER', value, todoListID
  }
}

