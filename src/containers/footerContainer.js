import AppFooter from '../components/footer';
import { connect } from 'react-redux';
import { addTodo, stateChange } from '../actions/index';


const mapStateToProps = (state) => {
    return {
        todoTextFromQuickAdd: state.componentsState.quickTodoTextBox,
        openModelDialog: state.componentsState.openModelDialog,
        modelDialogContent: state.componentsState.modelDialogContent,
        modelDialogContentProps: state.componentsState.modelDialogContentProps,
        onDialogClose: state.componentsState.onDialogClose,
        modelDialogOkClick: state.componentsState.modelDialogOkClick,
        additionalModelDialogButtons: state.componentsState.additionalModelDialogButtons,
        listItems: state.TodoItems,
        showCancelButton: state.componentsState.showCancelButton,
        okButtonName: state.componentsState.okButtonName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        quickAddtodo: (text) => {
            dispatch(addTodo(text, '', ''))
        },
        addTodo: (text, dueDate, listName) => {
            dispatch(addTodo(text, dueDate, listName))
        },
        onChange: (stateValue) => {
            dispatch(stateChange(stateValue))
        }
    }
}

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(AppFooter);
export default FooterContainer;