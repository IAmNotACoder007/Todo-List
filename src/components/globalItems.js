import React, { Component } from 'react';
import ConfirmationDialog from './common/confirmationDialog';
import ModelDialog from './common/modelDialog';
import Proptypes from 'prop-types';

class GlobalItems extends Component {
    render() {
        return (
            <div className="global-items-holder">
                <ModelDialog
                    showCancelButton={this.props.showCancelButton}
                    additionalModelDialogButtons={this.props.additionalModelDialogButtons}
                    onDialogClose={this.props.onDialogClose}
                    show={this.props.openModelDialog || false}
                    stateChange={this.props.stateChange}
                    okButtonClick={this.props.modelDialogOkClick}
                    okButtonName={this.props.okButtonName}
                    modelName={this.props.modelDialogContent}
                    modelProps={this.props.modelDialogContentProps}
                    modelDialogTitle={this.props.modelDialogTitle}>
                </ModelDialog>

                <ConfirmationDialog changeState={this.props.stateChange}
                    onConfirmation={this.props.onConfirmation}
                    askConfimation={this.props.askConfimation}
                    confirmationDialogTitle={this.props.confirmationDialogTitle}
                    onConfirmationDialogClose={this.props.onConfirmationDialogClose}
                    onConfirmationCancel={this.props.onConfirmationCancel}
                    confirmationMessage={this.props.confirmationMessage}>
                </ConfirmationDialog>
            </div>
        )
    }
}

GlobalItems.propTypes = {
    confirmationMessage: Proptypes.string,
    confirmationDialogTitle: Proptypes.string,
    askConfimation: Proptypes.bool,
    onConfirmation: Proptypes.func,
    stateChange: Proptypes.func,
    modelDialogOkClick: Proptypes.func,
    modelDialogContentProps: Proptypes.any,
    modelDialogContent: Proptypes.any,
    additionalModelDialogButtons: Proptypes.arrayOf(Proptypes.shape({
        text: Proptypes.string,
        onClick: Proptypes.func
    })),
    showCancelButton: Proptypes.bool,
    okButtonName: Proptypes.string,
    onDialogClose: Proptypes.func,
    openModelDialog: Proptypes.bool,
    onConfirmationDialogClose: Proptypes.func,
    onConfirmationCancel: Proptypes.func
}

GlobalItems.defaultProps = {
    modelDialogContentProps: {}
}

export default GlobalItems