import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Checkbox from './common/checkbox';
import TodoModel from './model/todoModel';
import { getFormattedDateString } from './helpers/dateUtils'
class Todos extends Component {
    todoItemsStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        boxShadow: '0px 0px 1px 1px #BDBDBD',
        padding: '2px',
        borderRadius: '2px'
    }

    todoInfoStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: '1'
    }

    todoElementstyle = {
        paddingBottom: '5px'
    }

    onDialogClose = () => {
        this.props.stateChange({ 'modelDialogContentProps': null });
    }


    editTodo = (id, todo, listName, date) => {
        let modelProps = {
            selectedListItem: listName,
            todoTextError: false,
            todoTextFromDialog: todo,
            dueDate: new Date(date),
        }
        let modelDialogProps = {
            stateChanged: (state) => {
                modelDialogProps = {
                    ...modelDialogProps,
                    ...state
                }
                this.props.stateChange({ 'modelDialogContentProps': modelDialogProps })
            },
            ...modelProps
        }

        const state = {
            openModelDialog: true,
            onDialogClose: this.onDialogClose,
            modelDialogOkClick: () => {
                if (!this.props.modelDialogContentProps.todoTextFromDialog) {
                    this.props.stateChange({ "modelDialogContentProps": { ...modelDialogProps, todoTextError: true } })
                    return false;
                }
                this.props.editTodo(id, this.props.modelDialogContentProps.todoTextFromDialog, getFormattedDateString(this.props.modelDialogContentProps.dueDate || date), this.props.modelDialogContentProps.selectedListItem || listName)
            },
            modelDialogContentProps: modelDialogProps,
            modelDialogContent: TodoModel
        }
        this.props.stateChange(state)
    }
    getTodos() {
        if (this.props.todoItems && this.props.todoItems.length) {
            return this.props.todoItems.map((todo) => {
                return (
                    <div key={todo.id} style={this.todoItemsStyle}>
                        <Checkbox checked={todo.completed} finishTodo={() => { this.props.finishTodo(todo.id) }}></Checkbox>
                        <div style={this.todoInfoStyle} onClick={() => { this.editTodo(todo.id, todo.todoText, todo.todoList, todo.dueDate) }}>
                            <span style={todo.dueDate ? this.todoElementstyle : {}}>{todo.todoText}</span>
                            <span style={todo.dueDate ? { ...this.todoElementstyle, fontSize: '13px', color: '#2196F3' } : { display: 'none' }}>{todo.dueDate}</span>
                            <span style={todo.todoList ? { display: 'block', fontSize: '13px' } : { display: 'none' }}>{todo.todoList}</span>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="no-data-found">No Data Found</div>
            )
        }
    }
    render() {
        return (
            <div className="todo-items-holder" style={{
                flex: 1, maxHeight: 'calc(100% - 160px)',
                overflow: 'auto',
                padding: '10px'
            }}>
                {this.getTodos()}
            </div>
        )
    }
}

const todosInfo = {
    id: Proptypes.string,
    todoText: Proptypes.string,
    completed: Proptypes.bool,
    todoList: Proptypes.string,
    dueDate: Proptypes.string,
    todoTextFromDialog: Proptypes.string,
    selectedListItem: Proptypes.string,

}

Todos.proptypes = {
    todoItems: Proptypes.arrayOf(Proptypes.shape(todosInfo)).isRequired,
    finishTodo: Proptypes.func.isRequired,
    editTodo: Proptypes.func.isRequired,
    stateChange: Proptypes.func.isRequired,
    modelDialogContentProps: Proptypes.Object,
    modelDialogContent: Proptypes.element
}


export default Todos;