import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class DateTime extends Component {
    handleChange = prop => event => {
        this.props.onChange({ [prop]: event.target.value })
    };

    getISOdateString(date) {
        let d = date;
        if (isNaN(date)) return '';
        if (!d)
            d = new Date();
        const pad = (number) => {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return d.getFullYear() +
            '-' + pad(d.getMonth() + 1) +
            '-' + pad(d.getDate()) +
            'T' + pad(d.getHours()) +
            ':' + pad(d.getMinutes()) +
            ':' + pad(d.getSeconds());
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="data-time-holder">
                <TextField
                    id="datetime-local"
                    label={this.props.label}
                    type="datetime-local"
                    defaultValue={this.getISOdateString(this.props.defaultValue)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange(this.props.id || "textbox")}
                />
            </div>
        )
    }


}


DateTime.propTypes = {
    classes: Proptypes.object.isRequired,
    label: Proptypes.string,
    defaultValue: Proptypes.any,
    id: Proptypes.string,
    onChange: Proptypes.func.isRequired,
};

DateTime.defaultProps = {
    label: '',
    defaultValue: undefined
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

export default withStyles(styles)(DateTime);
