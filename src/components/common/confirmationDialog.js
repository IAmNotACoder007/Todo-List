import React, { Component } from 'react';
import Dialog from './dialog';
import Proptypes from 'prop-types';

class ConfirmationDialog extends Component {

    closeConfirmationDialog = () => {
        this.props.changeState({ askConfimation: false });
        if (this.props.onConfirmationDialogClose)
            this.props.onConfirmationDialogClose()
    }

    getConfirmationDialogButtons() {
        return [
            {
                text: "yes",
                onClick: () => {
                    this.props.onConfirmation();
                    this.closeConfirmationDialog()
                }
            },
            {
                text: "no",
                onClick: () => {
                    this.closeConfirmationDialog();
                    if (this.props.onConfirmationCancel)
                        this.props.onConfirmationCancel()
                }
            }
        ]
    }
    render() {
        return (
            <div className="confirmation-dialog-holder">
                <Dialog isAlertDialog={true} buttons={this.getConfirmationDialogButtons()} open={this.props.askConfimation} content={this.props.confirmationMessage} title={this.props.confirmationDialogTitle}>
                </Dialog>
            </div>
        )
    }
}

ConfirmationDialog.propTypes = {
    confirmationMessage: Proptypes.string,
    confirmationDialogTitle: Proptypes.string,
    askConfimation: Proptypes.bool,
    onConfirmation: Proptypes.func,
    changeState: Proptypes.func,
    onConfirmationDialogClose: Proptypes.func,
    onConfirmationCancel: Proptypes.func
}

ConfirmationDialog.defaultProps = {
    confirmationMessage: "Are you sure?",
    askConfimation: false
}

export default ConfirmationDialog;