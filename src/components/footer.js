import React, { Component } from 'react';
import TextBox from './common/textbox';
import Proptypes from 'prop-types';
import FloatingAddButton from '../components/common/floatingAddButton';
import ModelDialog from './common/modelDialog';
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
        this.onChange({ 'modelDialogContentProps': null });
        this.modelProps = this.defaultModelProps();
    }

    openTodoDialog = () => {
        const state = {
            onDialogClose: this.closeTodoDialog,
            modelDialogOkClick: this.addTodo,
            openModelDialog: true,
            modelDialogContentProps: {
                stateChanged: (state) => {
                    this.modelProps = {
                        ...this.modelProps,
                        ...state
                    }
                    const newState = {                       
                        ...this.modelProps,
                        ...{
                            items: ['Default', ...this.props.listItems.map((item) => {
                                return item.name
                            })]
                        },
                    }
                    this.onChange({ 'modelDialogContentProps': newState })
                },
                ...this.getTodoModelDefaultprops()
            },
            modelDialogContent: TodoModel
        }
        this.onChange(state)
    }

    addTodo = () => {
        if (!this.props.modelDialogContentProps.todoTextFromDialog) {
            this.onChange({ "modelDialogContentProps": { ...this.modelProps, todoTextError: true } });
            return false;
        }
        let dueDate = getFormattedDateString(this.props.modelDialogContentProps.dueDate || document.getElementById("datetime-local").value);
        this.props.addTodo(this.props.modelDialogContentProps.todoTextFromDialog, dueDate, this.props.modelDialogContentProps.selectedListItem || "Default");
    }

    render() {
        return (
            <footer>
                <div className="todo-footer" style={this.footerStyle}>
                    <TextBox fullWidth={true} holderStyle={{ flex: 1 }} id="quickTodoTextBox" value={this.props.todoTextFromQuickAdd || ''} onChange={this.onChange} label="Quick Add Todo"></TextBox>
                    <FloatingAddButton onClick={this.openTodoDialog}></FloatingAddButton>
                    <ModelDialog showCancelButton={this.props.showCancelButton} additionalModelDialogButtons={this.props.additionalModelDialogButtons} onDialogClose={this.props.onDialogClose} show={this.props.openModelDialog || false} stateChange={this.props.onChange} okButtonClick={this.props.modelDialogOkClick} okButtonName={this.props.okButtonName} modelName={this.props.modelDialogContent} modelProps={this.props.modelDialogContentProps}></ModelDialog>
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
    openModelDialog: Proptypes.bool,
    addTodo: Proptypes.func.isRequired,
    onDialogClose: Proptypes.func,
    modelDialogOkClick: Proptypes.func,
    modelDialogContentProps: Proptypes.Object,
    modelDialogContent: Proptypes.element,
    additionalModelDialogButtons: Proptypes.arrayOf(Proptypes.shape({
        text: Proptypes.string,
        onClick: Proptypes.func
    })),
    listItems: Proptypes.arrayOf(Proptypes.shape({
        id: Proptypes.string,
        name: Proptypes.string
    })),
    showCancelButton: Proptypes.bool,
    okButtonName: Proptypes.string
}

AppFooter.defaultProps = {
    todoTextFromQuickAdd: '',
    openModelDialog: false,
    todoTextFromDialog: '',
    todoTextError: false,
    selectedListItem: "Default"
}

export default AppFooter;