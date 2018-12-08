import React, { Component } from 'react';
import TextBox from '../common/textbox';
import DateTime from '../common/datetimepicker';
import List from '../list';
import Proptypes from 'prop-types';

class TodoModel extends Component {
    state = {
        selectedItem: ''
    }

    onChange = (value) => {
        this.props.stateChanged(value);
    }

    getHelperText() {
        return this.props.todoTextError ? "Todo must be specified" : '';
    }

    render() {
        return (
            <div>
                <TextBox helperText={this.getHelperText()} error={this.props.todoTextError} id="todoTextFromDialog" defaultValue={this.props.todoTextFromDialog || ''}
                    onChange={(state) => {
                        if (Object.values(state)[0]) {
                            state = { ...state, todoTextError: false }
                        } this.onChange(state)
                    }} label="What Needs To Be Done?"></TextBox>
                <List items={this.props.items} defaultValue={this.state.selectedItem || this.props.selectedListItem} onChange={
                    (text) => {
                        this.onChange({ "selectedListItem": text })
                        this.setState({ selectedItem: text })
                    }
                }></List>
                <DateTime id="dueDate" onChange={this.props.stateChanged} defaultValue={this.props.dueDate}></DateTime>
            </div>
        )
    }
}

TodoModel.proptypes = {
    stateChanged: Proptypes.func.isRequired,
    todoTextError: Proptypes.bool,
    selectedListItem: Proptypes.string,
    todoTextFromDialog: Proptypes.string,
    dueDate: Proptypes.any,
    items: Proptypes.arrayOf(Proptypes.string)
}
TodoModel.defaultProps = {
    todoTextError: false,
}


export default TodoModel;