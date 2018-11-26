import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class FloatingAddbutton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className="floating-add-button-holder">
                <Button onClick={this.props.onClick} variant="fab" color="primary" aria-label="Add" className={classes.button}>
                    <AddIcon />
                </Button>
            </div>
        )
    }
}

FloatingAddbutton.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

export default withStyles(styles)(FloatingAddbutton);