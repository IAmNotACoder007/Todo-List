import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

class MaterialDialog extends Component {
    getDialogContent() {
        return (
            <DialogContent>
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
const buttonModel = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

MaterialDialog.propTypes = {
    content: PropTypes.any.isRequired,
    title: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape(buttonModel)).isRequired,
    open: PropTypes.bool
}

MaterialDialog.defaultProps = {
    title: "",
    open: false
}

export default MaterialDialog;