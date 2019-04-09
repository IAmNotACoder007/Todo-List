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

    onKeyPress = (prop, event) => {
        if (event.charCode === 13 && this.props.clearOnEnetrKeyPress) {
            document.getElementById(prop).value = '';
            this.setState({
                [prop]: '',
            });           
        }
    }

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
                    onChange={this.handleChange(this.props.id || "textbox")}
                    margin="normal"
                    fullWidth={this.props.fullWidth}
                    error={this.props.error}
                    helperText={this.props.helperText}
                    defaultValue={this.props.defaultValue}
                    onKeyPress={(event) => { this.onKeyPress(this.props.id, event) }}
                />
            </div>
        )
    }
}
TextBox.propTypes = {
    defaultValue: Proptypes.string,
    label: Proptypes.string,
    onChange: Proptypes.func.isRequired,
    id: Proptypes.string,
    holderStyle: Proptypes.object,
    fullWidth: Proptypes.bool,
    error: Proptypes.bool,
    helperText: Proptypes.string,
    clearOnEnetrKeyPress: Proptypes.bool
}

TextBox.defaultProps = {
    label: '',
    id: '',
    fullWidth: false,
    error: false,
    helperText: '',
    clearOnEnetrKeyPress: false,
    defaultValue: ''
}

export default TextBox;