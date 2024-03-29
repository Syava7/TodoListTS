import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../store/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../store/task-reducer';
import {todoListsReducer} from '../store/todolists-reducer';
import { v1 } from 'uuid';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer
})

const initialGlobalState = {
  todoLists: [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storeFn: any) => <Provider store={storyBookStore}>
  {storeFn()}
</Provider>