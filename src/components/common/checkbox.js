import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Proptypes from 'prop-types';


class CheckBox extends Component {
    state = {
        [this.props.value]: undefined
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.finishTodo(event.target, event.target.checked)
    };

    render() {
        return (
            <div className="checkbox-holder">
                <Checkbox
                    checked={this.state[this.props.value] === undefined ? this.props.checked : this.state[this.props.value]}
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
    value: 'checkbox'
}

export default CheckBox;