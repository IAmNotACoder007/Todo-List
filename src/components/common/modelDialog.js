import React, { Component } from 'react';
import Dialog from './dialog';
import Proptypes from 'prop-types';

class ModelDialog extends Component {
    getDialogContent() {
        const Model = this.props.modelName;
        if (Model) {
            return (
                <Model {...this.props.modelProps}></Model>
            )
        }
        return '';
    }

    getDialogButtons() {
        return (
            [
                ...this.props.additionalModelDialogButtons,
                {
                    text: this.props.okButtonName,
                    onClick: this.okButtonClick
                }, {
                    text: "Cancel",
                    onClick: this.closeTodoDialog
                }]
        )
    }
    okButtonClick = () => {
        const isValidDialog = this.props.okButtonClick();
        if (isValidDialog !== false)
            this.closeTodoDialog();

    }

    closeTodoDialog = () => {
        this.props.stateChange({
            "openModelDialog": false,
        });
        if (this.props.onDialogClose)
            this.props.onDialogClose();
    }

    render() {
        return (
            <Dialog open={this.props.show} content={this.getDialogContent()} buttons={this.getDialogButtons()} title={this.props.title}></Dialog>
        )
    }
}

ModelDialog.proptypes = {
    modelName: Proptypes.element.isRequired,
    modelProps: Proptypes.object,
    okButtonName: Proptypes.string,
    okButtonClick: Proptypes.func.isRequired,
    dialogTitle: Proptypes.string,
    show: Proptypes.bool,
    stateChange: Proptypes.func.isRequired,
    onDialogClose: Proptypes.func,
    additionalModelDialogButtons: Proptypes.arrayOf(Proptypes.shape({
        text: Proptypes.string,
        onClick: Proptypes.func
    }))
}

ModelDialog.defaultProps = {
    okButtonName: "Ok",
    dialogTitle: '',
    show: false,
    additionalModelDialogButtons: []
}

export default ModelDialog;