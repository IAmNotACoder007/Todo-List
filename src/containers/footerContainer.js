import AppFooter from '../components/footer';
import { connect } from 'react-redux';
import { addTodo, stateChange } from '../actions/index';


const mapStateToProps = (state) => {
    return {
        todoTextFromQuickAdd: state.componentsState.quickTodoTextBox,
        listItems: state.TodoItems,
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