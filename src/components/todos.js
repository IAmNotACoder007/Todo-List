import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Checkbox from './common/checkbox';
import TodoModel from './model/todoModel';
import { getFormattedDateString, isTodaysDate, isTommorowsDate } from './helpers/dateUtils';
import PlayArrow from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import sleeping from '../images/sleeping.gif';

class Todos extends Component {
    todoItemsStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        boxShadow: '0px 0px 1px 1px #BDBDBD',
        padding: '2px',
        borderRadius: '2px',
        marginLeft: '25px'
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
            items: ['Default', ...this.props.listItems.map((item) => {
                return item.name
            })]
        }
        let modelDialogProps = {
            ...modelProps
        }

        const state = {
            openModelDialog: true,
            onDialogClose: this.onDialogClose,
            modelDialogOkClick: (content) => {
                if (!content.todoTextFromDialog) {
                    this.props.stateChange({ "modelDialogContentProps": { ...modelDialogProps, todoTextError: true } })
                    return false;
                }
                this.props.editTodo(id, content.todoTextFromDialog, getFormattedDateString(content.dueDate || date), content.selectedListItem || listName)
            },
            modelDialogContentProps: modelDialogProps,
            modelDialogContent: TodoModel
        }
        this.props.stateChange(state)
    }

    getGroupsForTodos = () => {
        let todosWithGroups = [];
        if (this.props.todoItems.length) {
            todosWithGroups = this.props.todoItems.map((todo) => {
                const todoWithGroup = { ...todo, ...{ groupName: this.getGroupName(todo.dueDate) } };
                return todoWithGroup;
            });

            todosWithGroups = todosWithGroups.sort(function (a, b) {
                if (a.groupName !== "No Date" && b.groupName !== "No Date")
                    return new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf();
                return 0;
            })
        }
        return todosWithGroups;
    }

    getGroupName(date) {
        if (date) {
            const dateObj = new Date(date);
            if (!isNaN(dateObj.getHours())) {
                if (isTodaysDate(date))
                    return "Today";
                else if (isTommorowsDate(date))
                    return "Tomorrow";
                else
                    return "Later";
            }
        }

        return "No Date";
    }

    collapseExpandTodos = (event) => {
        const svgElement = event.currentTarget.getElementsByClassName("expand-collaps-arrow")[0];
        if (svgElement.classList.contains("opened")) {
            svgElement.classList.remove("opened");
            svgElement.closest("#groupName").nextElementSibling.style.display = "none";
        }
        else {
            svgElement.classList.add("opened");
            svgElement.closest("#groupName").nextElementSibling.style.display = "block";
        }
    }

    getTodos() {
        if (this.props.todoItems && this.props.todoItems.length) {
            const todosWithGroups = this.getGroupsForTodos();
            const groups = ["Today", "Tomorrow", "Later", "No Date"];
            return groups.map((group) => {
                const todos = todosWithGroups.filter((todo) => {
                    return todo.groupName === group;
                });
                if (todos && todos.length) {
                    return (
                        <div key={group}>
                            <div id="groupName" style={{ display: 'flex', alignItems: 'center', paddingBottom: '5px', fontWeight: 500, color: "#2196F3" }} className="group-name">
                                <IconButton className="expand-collaps-arrow-holder" color="inherit" onClick={(e) => { this.collapseExpandTodos(e) }}>
                                    <PlayArrow className="expand-collaps-arrow opened"></PlayArrow>
                                </IconButton>
                                {group}
                            </div>
                            <div id="todosItems">
                                {this.getView(todos)}
                            </div>
                        </div>
                    )
                } else {
                    return "";
                }

            });
        } else {
            return (
                <div className="no-data-found">
                    <img src={sleeping} alt="Nothig to do here" style={{ height: 200, width: 200 }} />
                </div>
            )
        }
    }

    askConfirmation(onConfirmation, onCancel) {
        const state = {
            changeState: this.props.stateChange,
            onConfirmation: onConfirmation,
            askConfimation: true,
            confirmationDialogTitle: "Finish Todo",
            confirmationMessage: "Do you want to finish this Todo?",
            onConfirmationDialogClose: this.resetConfirmationDialog,
            onConfirmationCancel: () => {
                onCancel();
            }
        }

        this.props.stateChange(state);
    }

    resetConfirmationDialog = () => {
        const state = {
            onConfirmation: undefined,
            askConfimation: false,
            onConfirmationCancel: undefined,
            onConfirmationDialogClose: undefined
        }
        this.props.stateChange(state);
    }

    getView(todos) {
        if (todos && todos.length)
            return todos.map((todo) => {
                return (
                    <div key={todo.id} style={this.todoItemsStyle} className="cssanimation">
                        <Checkbox checked={todo.completed} onClick={(target, value, resetState) => {
                            this.askConfirmation(() => {
                                target.closest('.cssanimation').classList.add("fadeOutLeft");
                                window.setTimeout(() => { this.props.finishTodo(todo.id) }, 1000);
                            }, resetState);
                        }}></Checkbox>
                        <div style={this.todoInfoStyle} onClick={() => { this.editTodo(todo.id, todo.todoText, todo.todoList, todo.dueDate) }}>
                            <span style={todo.dueDate ? this.todoElementstyle : {}}>{todo.todoText}</span>
                            <span style={todo.dueDate ? { ...this.todoElementstyle, fontSize: '13px', color: '#2196F3' } : { display: 'none' }}>{todo.dueDate}</span>
                            <span style={todo.todoList ? { display: 'block', fontSize: '13px' } : { display: 'none' }}>{todo.todoList}</span>
                        </div>
                    </div>
                )
            });
    }
    render() {
        return (
            <div className="todo-items-holder" style={{
                flex: 1, maxHeight: 'calc(100% - 160px)',
                overflow: 'auto',
                padding: '10px',
                overflowX: 'hidden'
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
    listItems: Proptypes.arrayOf(Proptypes.shape({
        id: Proptypes.string,
        name: Proptypes.string
    }))
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