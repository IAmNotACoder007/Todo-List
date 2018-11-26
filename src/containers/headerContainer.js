import Header from '../components/header';
import { filterTodos, stateChange, addTodoItem } from '../actions/index';
import { connect } from 'react-redux';



const mapStateToProps = (state) => {
    return {
        filterText: state.filterBy,
        showMoreMenuOnHeader: state.componentsState.showMoreMenuOnHeader,
        showOn: state.componentsState.showOn,
        listItems: state.TodoItems,
        openStringEditor: state.componentsState.openStringEditor,
        stringEditorProps: state.componentsState.stringEditorProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterTodos: (filter) => {
            dispatch(filterTodos(filter))
        },
        stateChange: (stateValue) => {
            dispatch(stateChange(stateValue))
        },
        addTodoItem: (item) => {
            dispatch(addTodoItem(item))
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
export default HeaderContainer;