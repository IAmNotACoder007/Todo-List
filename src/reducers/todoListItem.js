import id from 'uuid/v4';

const TodoItems = (state, action) => {
    switch (action.type) {
        case "ADD_TODO_ITEM":
            return [
                ...state,
                {
                    id: id(),
                    name: action.item,
                }]
        case "DELETE_TODO_ITEM":
            return state.filter((item) => {
                return item.id !== action.id;
            })
        case "EDIT_TODO_ITEM":
            return state.filter((item) => {
                if (item.id === action.id) {
                    item.name = action.name;
                }
                return item;
            })
        default:
            return (
                state || []
            )
    }
}

export default TodoItems