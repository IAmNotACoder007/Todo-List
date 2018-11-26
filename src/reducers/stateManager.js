const componentsState = (state, action) => {
    switch (action.type) {
        case 'STATE_CHANGE':
            return { ...state, ...action.state };
        default:
            return state || ''
    }
}

export default componentsState