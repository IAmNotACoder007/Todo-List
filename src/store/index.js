import { createStore, combineReducers } from 'redux';
import filterBy from '../reducers/filterTodos';
import componentsState from '../reducers/stateManager';
import Todos from '../reducers/todos'
import TodoItems from '../reducers/todoListItem'

export const store = createStore(
    combineReducers({
        filterBy,
        componentsState,
        Todos,
        TodoItems
    })
)