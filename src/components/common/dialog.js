import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide';

class MaterialDialog extends Component {
    getDialogContent() {
        return (
            <DialogContent className="dialog-content">
                {this.props.content}
            </DialogContent>
        )
    }



    getDialogTitle() {
        return (
            <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        )
    }

    getDialogButtons() {
        if (this.props.buttons.length) {
            return (
                this.props.buttons.map((button) => {
                    return (
                        <Button key={button.text} onClick={button.onClick} color="primary">
                            {button.text}
                        </Button>
                    )
                })
            )
        }
    }
    render() {
        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="form-dialog-title"
                TransitionComponent={this.props.isAlertDialog ? Transition : undefined}
                className={this.props.className}
            >
                {this.getDialogTitle()}
                {this.getDialogContent()}
                <DialogActions>
                    {this.getDialogButtons()}
                </DialogActions>
            </Dialog>
        )
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const buttonModel = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

MaterialDialog.propTypes = {
    content: PropTypes.any.isRequired,
    title: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape(buttonModel)).isRequired,
    open: PropTypes.bool,
    isAlertDialog: PropTypes.bool,
    className: PropTypes.string
}

MaterialDialog.defaultProps = {
    title: "",
    open: false,
    isAlertDialog: false,
    className: ""
}

export default MaterialDialog;