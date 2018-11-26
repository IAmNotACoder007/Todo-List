import Todos from '../components/todos';
import { connect } from 'react-redux';
import { finishTodo, editTodo, stateChange } from '../actions/index';


const mapStateToProps = (state) => {
    return {
        todoItems: state.Todos.filter((todo) => {
            if (state.filterBy === 'All')
                return todo.completed === false;
            return todo.completed === false && todo.todoList === state.filterBy;
        }),

        modelDialogContent: state.componentsState.modelDialogContent,
        modelDialogContentProps: state.componentsState.modelDialogContentProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        finishTodo: (id) => {
            dispatch(finishTodo(id));
        },

        editTodo: (id, text, dueDate, todoList) => {
            dispatch(editTodo(id, text, dueDate, todoList))
        },

        stateChange: (state) => {
            dispatch(stateChange(state))
        }
    }
}

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(Todos);
export default TodosContainer;
