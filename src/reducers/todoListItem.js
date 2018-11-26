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
        default:
            return (
                state || []
            )
    }
}

export default TodoItems