import React, { Component } from 'react';
import ConfirmationDialog from './common/confirmationDialog';
import Proptypes from 'prop-types';

class GlobalItems extends Component {
    render() {
        return (
            <div className="global-items-holder">
                <ConfirmationDialog changeState={this.props.changeState} onConfirmation={this.props.onConfirmation} askConfimation={this.props.askConfimation} confirmationDialogTitle={this.props.confirmationDialogTitle} confirmationMessage={this.props.confirmationMessage}></ConfirmationDialog>
            </div>
        )
    }
}

GlobalItems.propTypes = {
    confirmationMessage: Proptypes.string,
    confirmationDialogTitle: Proptypes.string,
    askConfimation: Proptypes.bool,
    onConfirmation: Proptypes.func,
    changeState: Proptypes.func
}

export default GlobalItems