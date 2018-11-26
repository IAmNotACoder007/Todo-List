import id from 'uuid/v4';

const Todos = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: id(),
                    todoText: action.text,
                    completed: false,
                    dueDate: action.dueDate,
                    todoList: action.todoList
                }]
        case "EDIT_TODO":
            return (state.map((todo) => {
                if (todo.id === action.id) {
                    todo.todoText = action.text;
                    todo.dueDate = action.dueDate;
                    todo.todoList = action.todoList
                    return todo;
                }
                return todo;
            }))
        case "FINISH_TODO":
            return (
                state.map((todo) => {
                    if (todo.id === action.id) {
                        todo.completed = true;
                        return todo;
                    }
                    return todo;
                })
            )

        default:
            return (
                state || []
            )

    }
}

export default Todos;