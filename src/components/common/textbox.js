import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Proptypes from 'prop-types'

class TextBox extends Component {
    state = {
        [this.props.id || "textbox"]: ""
    }

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value,
        });
        this.props.onChange({ [prop]: event.target.value })
    };

    render() {
        const styles = theme => ({
            textField: {
                marginLeft: theme.spacing.unit,
                marginRight: theme.spacing.unit,
                width: 200,
            }
        });
        return (
            <div className="textbox-holder" style={this.props.holderStyle}>
                <TextField
                    id={this.props.id}
                    label={this.props.label}
                    className={styles.textField}
                    value={this.state[this.props.id || "textbox"] || this.props.defaultValue}                   
                    onChange={this.handleChange(this.props.id || "textbox")}
                    margin="normal"
                    fullWidth={this.props.fullWidth}
                    error={this.props.error}
                    helperText={this.props.helperText}
                />
            </div>
        )
    }
}
TextBox.proptypes = {
    defaultValue: Proptypes.string,
    label: Proptypes.string,
    onChange: Proptypes.func.isRequired,
    id: Proptypes.string,
    holderStyle: Proptypes.object,
    fullWidth: Proptypes.bool,
    error: Proptypes.bool,
    helperText: Proptypes.string
}

TextBox.defaultProps = {
    value: '',
    label: '',
    id: '',
    fullWidth: false,
    error: false,
    helperText: ''
}

export default TextBox;