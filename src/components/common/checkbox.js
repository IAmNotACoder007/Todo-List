import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Proptypes from 'prop-types';


class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            [this.props.value]: undefined
        }

        this.state = this.defaultState;
    }

    resetState = () => {
        this.setState(this.defaultState);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        if (this.props.onClick) {
            this.props.onClick(event.target, event.target.checked, this.resetState)
        }
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

CheckBox.propTypes = {
    checked: Proptypes.bool,
    value: Proptypes.string,
    onClick: Proptypes.func.isRequired
}

CheckBox.defaultProps = {
    checked: false,
    value: 'checkbox'
}

export default CheckBox;