import React, { Component } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


class ComboBox extends Component {

    getMenuItem() {
        return (
            this.props.comboboxMenuItems.map((item) => {
                return (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                )

            })
        )
    }

    getHelpertext() {
        if (this.props.comboboxHelperText) {
            return (
                <FormHelperText>{this.props.comboboxHelperText}</FormHelperText>
            )
        }
    }

    handleChange = event => {
        this.props.comboboxValueChangeHandler(event.target.value);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="combobox-container">
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.props.comboboxDefaultValue || this.props.comboboxMenuItems[0]}
                        onChange={this.handleChange}
                        displayEmpty
                        name="age"
                        className={classes.selectEmpty}
                    >
                        {this.getMenuItem()}
                    </Select>
                    {this.getHelpertext()}
                </FormControl>
            </div>
        )
    }
}

ComboBox.propTypes = {
    comboboxValueChangeHandler: PropTypes.func.isRequired,
    comboboxDefaultValue: PropTypes.string,
    comboboxMenuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    comboboxHelperText: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

ComboBox.defaultProps = {
    comboboxDefaultValue: "",
    comboboxHelperText: ""
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(ComboBox);