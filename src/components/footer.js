import React, { Component } from 'react';
import TextBox from './common/textbox';
import Proptypes from 'prop-types';
import FloatingAddButton from '../components/common/floatingAddButton';
import TodoModel from './model/todoModel';
import { getFormattedDateString } from './helpers/dateUtils'

class AppFooter extends Component {

    onChange = (value) => {
        this.props.onChange(value);
    }

    getTodoModelDefaultprops() {
        return {
            selectedListItem: undefined,
            todoTextError: undefined,
            todoTextFromDialog: undefined,
            dueDate: new Date(),
            items: ['Default', ...this.props.listItems.map((item) => {
                return item.name
            })]
        }
    }

    defaultModelProps() {
        return {
            stateChanged: (state) => {
                this.modelProps = {
                    ...this.modelProps,
                    ...state
                }
                this.onChange({ 'modelDialogContentProps': this.modelProps })
            },
            ...this.getTodoModelDefaultprops()
        }
    }

    modelProps = this.defaultModelProps();

    footerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

    closeTodoDialog = () => {
        this.onChange({ 'modelDialogContentProps': null, modelDialogTitle: "" });
        this.modelProps = this.defaultModelProps();
    }

    openTodoDialog = () => {
        const state = {
            onDialogClose: this.closeTodoDialog,
            modelDialogOkClick: this.addTodo,
            openModelDialog: true,
            okButtonName: 'Save',
            modelDialogContentProps: {
                ...this.getTodoModelDefaultprops()
            },
            modelDialogContent: TodoModel,
            modelDialogTitle: "Add Todo"
        }
        this.onChange(state)
    }

    addTodo = (content) => {
        if (!content.todoTextFromDialog) {
            this.onChange({ "modelDialogContentProps": { ...this.modelProps, todoTextError: true } });
            return false;
        }
        let dueDate = getFormattedDateString(content.dueDate || document.getElementById("datetime-local").value);
        this.props.addTodo(content.todoTextFromDialog, dueDate, content.selectedListItem || "Default");
    }

    render() {
        return (
            <footer>
                <div className="todo-footer" style={this.footerStyle}>
                    <TextBox clearOnEnetrKeyPress={true} fullWidth={true} holderStyle={{ flex: 1 }} id="quickTodoTextBox" onChange={this.onChange} label="Quick Add Todo"></TextBox>
                    <FloatingAddButton onClick={this.openTodoDialog}></FloatingAddButton>
                </div>
            </footer>
        )
    }

    componentDidMount() {
        document.getElementById("quickTodoTextBox").addEventListener("keyup", (e) => {
            if (e.keyCode === 13 && this.props.todoTextFromQuickAdd) {
                this.props.quickAddtodo(this.props.todoTextFromQuickAdd);
                this.onChange({ 'quickTodoTextBox': "" });
            }
        })
    }
}

AppFooter.proptypes = {
    todoTextFromQuickAdd: Proptypes.string,
    quickAddtodo: Proptypes.func.isRequired,
    onChange: Proptypes.func.isRequired,
    addTodo: Proptypes.func.isRequired,
    listItems: Proptypes.arrayOf(Proptypes.shape({
        id: Proptypes.string,
        name: Proptypes.string
    })),

}

AppFooter.defaultProps = {
    todoTextFromQuickAdd: '',
}

export default AppFooter;