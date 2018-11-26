export const filterTodos = (filter) => {
    return {
        type: "FILTER_TODOS",
        filter
    }
}

export const addTodo = (text, dueDate, todoList) => {
    return {
        type: "ADD_TODO",
        text,
        dueDate,
        todoList
    }
}

export const editTodo = (id, text, dueDate, todoList) => {
    return {
        type: "EDIT_TODO",
        id,
        text,
        dueDate,
        todoList
    }
}

export const finishTodo = (id) => {
    return {
        type: "FINISH_TODO",
        id
    }
}

export const stateChange = (state) => {
    return {
        type: "STATE_CHANGE",
        state,
    }
}

export const addTodoItem = (item) => {
    return {
        type: "ADD_TODO_ITEM",
        item,
    }
}

