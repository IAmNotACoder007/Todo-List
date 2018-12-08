import React, { Component } from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class StringArrayEditor extends Component {
    deleteItem = (id) => {
        this.confirmThenDelete(id);
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

    getEditDeteleIconForEntity(id) {
        if (id) {
            return (
                <div>
                    <IconButton color="inherit">
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
                            {this.getEditDeteleIconForEntity(entity.id)}
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
    confirmationMessage:Proptypes.string
}

StringArrayEditor.defaultProps = {
    entities: []
}

export default StringArrayEditor;