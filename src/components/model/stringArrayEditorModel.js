import React, { Component } from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class StringArrayEditor extends Component {
    deleteItem = (id) => {
        this.confirmThenDelete(id);
    }

    editItem = (id, name) => {
        let listItemName = undefined;
        const state = {
            openStringEditor: true,
            stringEditorProps: {
                isRequired: true,
                stringEditorTextboxId: 'listItemName',
                stringEditorTitle: "Edit Todos Category",
                stringEditorDefaultValue: name,
                stringEditorOkClick: () => {
                    this.props.onEditComplete(id, listItemName);
                },
                stringEditorValueChange: (name) => {
                    listItemName = Object.values(name)[0];
                },
                stateChange: this.props.changeState
            }
        }
        this.props.changeState(state);
    }

    confirmThenDelete = (id) => {
        const confirmationDialogState = {
            confirmationDialogTitle: "Alert",
            askConfimation: true,
            onConfirmation: () => {
                this.props.onDelete(id)
            },
            changeState: this.props.changeState,
            confirmationMessage: this.props.confirmationMessage
        }

        this.props.changeState(confirmationDialogState)
    }

    getEditDeteleIconForEntity(id, name) {
        if (id) {
            return (
                <div>
                    <IconButton color="inherit" onClick={() => { this.editItem(id, name) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => { this.deleteItem(id) }}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="string-array-editor" style={{ height: '250px', width: '350px' }}>
                {this.props.entities.map((entity) => {
                    return (
                        <div key={entity.id || entity.name} style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
                            <span style={{ flex: '1' }}>{entity.name}</span>
                            {this.getEditDeteleIconForEntity(entity.id, entity.name)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

StringArrayEditor.proptypes = {
    entities: Proptypes.arrayOf(Proptypes.object),
    changeState: Proptypes.func,
    onDelete: Proptypes.func,
    confirmationMessage: Proptypes.string,
    onEditComplete: Proptypes.func
}

StringArrayEditor.defaultProps = {
    entities: []
}

export default StringArrayEditor;