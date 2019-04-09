import React, { Component } from 'react';
import Dialog from '../common/dialog';
import Proptypes from 'prop-types';
import TextBox from '../common/textbox';

class StringEditor extends Component {
    closeDialog = () => {
        this.props.stateChange({ "openStringEditor": false });
        if (this.props.onStringDialogClose)
            this.props.onStringDialogClose();
    }
    getDialogButtons() {
        return (
            [
                {
                    text: "Save",
                    onClick: () => {
                        if (this.props.stringEditorOkClick) {
                            this.props.stringEditorOkClick()
                        }
                        this.closeDialog();
                    }
                },
                {
                    text: "Cancel",
                    onClick: () => {
                        this.closeDialog();
                    }
                }
            ]
        )
    }

    getDialogContent() {
        return (
            <TextBox isRequired={this.props.stringEditorIsRequired} label={this.props.stringEditorTextboxlabel} id={this.props.stringEditorTextboxId} onChange={this.props.stringEditorValueChange} defaultValue={this.props.stringEditorDefaultValue}></TextBox>
        )
    }

    render() {
        return (
            <div className="string-editor">
                <Dialog buttons={this.getDialogButtons()} title={this.props.stringEditorTitle} open={this.props.openStringEditor} content={this.getDialogContent()}></Dialog>
            </div>
        )
    }
}

StringEditor.propTypes = {
    stringEditorTitle: Proptypes.string,
    openStringEditor: Proptypes.bool,
    stringEditorValueChange: Proptypes.func.isRequired,
    stringEditorDefaultValue: Proptypes.string,
    stringEditorIsRequired: Proptypes.bool,
    stringEditorTextboxlabel: Proptypes.string,
    stringEditorTextboxId: Proptypes.string,
    stateChange: Proptypes.func.isRequired,
    stringEditorOkClick: Proptypes.func,
    onStringDialogClose: Proptypes.func
}

StringEditor.defaultProps = {
    show: false,
    defaultValue: '',
    isRequired: true,
    label: '',
    id: ''
}
export default StringEditor;