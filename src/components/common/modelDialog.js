import React, { Component } from 'react';
import Dialog from './dialog';
import Proptypes from 'prop-types';

class ModelDialog extends Component {
    modelState = {};
    getModelContentState() {
        return (
            {
                ...this.props.modelProps,
                stateChanged: this.onModelStateChange
            }
        )
    }

    getDialogContent() {
        const Model = this.props.modelName;
        if (Model) {
            return (
                <Model {...this.getModelContentState()}></Model>
            )
        }
        return '';
    }

    onModelStateChange = (state) => {
        this.modelState = { ...this.modelState, ...state };
    }

    getCancelButton() {
        if (this.props.showCancelButton) {
            return [{
                text: "Cancel",
                onClick: this.closeTodoDialog
            }]
        }
        return [];
    }

    getDialogButtons() {
        return (
            [
                ...this.props.additionalModelDialogButtons,
                {
                    text: this.props.okButtonName,
                    onClick: this.okButtonClick
                },
                ...this.getCancelButton()
            ]
        )
    }
    okButtonClick = () => {
        const isValidDialog = this.props.okButtonClick({ ...this.props.modelProps, ...this.modelState });
        if (isValidDialog !== false)
            this.closeTodoDialog();

    }

    closeTodoDialog = () => {
        this.modelState={};
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
    })),
    showCancelButton: Proptypes.bool,
}

ModelDialog.defaultProps = {
    okButtonName: "Ok",
    dialogTitle: '',
    show: false,
    additionalModelDialogButtons: [],
    showCancelButton: true,
}

export default ModelDialog;