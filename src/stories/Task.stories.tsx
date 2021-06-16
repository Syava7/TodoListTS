import React from 'react';
import {Story, Meta} from '@storybook/react';
import Task, {TaskPropsType} from '../Task';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TODOLIST/Task',
  component: Task,

} as Meta;

const changeTaskStatusCallback = action('Change status clicked')
const changeTaskTitleCallback = action('Change title clicked')
const removeTaskCallback = action('Remove task')

const baseArg = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback,
}


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  task: {id: '1', title: 'JS', isDone: true},
  todoListID: 'todolistId',
  ...baseArg
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  task: {id: '1', title: 'JS', isDone: false},
  todoListID: 'todolistId1',
  ...baseArg
};




