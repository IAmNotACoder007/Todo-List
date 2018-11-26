import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Proptypes from 'prop-types';


class CheckBox extends Component {
    handleChange = name => event => {
        this.props.finishTodo(event.target.checked)
    };

    render() {
        return (
            <div className="checkbox-holder">
                <Checkbox
                    checked={this.props.checked}
                    onChange={this.handleChange(this.props.value)}
                    value={this.props.value}
                    color="primary"
                />
            </div>
        )
    }
}

CheckBox.proptypes = {
    checked: Proptypes.bool,
    value: Proptypes.string,
    finishTodo: Proptypes.func.isRequired
}

CheckBox.defaultProps = {
    checked: false,
    value: ''
}

export default CheckBox;