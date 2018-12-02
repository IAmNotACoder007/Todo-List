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

        default:
            return (
                state || []
            )
    }
}

export default TodoItems