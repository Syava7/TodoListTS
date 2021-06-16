import React from 'react';
import {Story, Meta} from '@storybook/react';
import  {AddItemFormPropsType} from '../AddItemForm';
import AppWithRedux from '../AppWithRedux';
import {Provider} from 'react-redux';
import {store} from '../store/store';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <AppWithRedux  />


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {

};




