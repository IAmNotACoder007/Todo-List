import React, { Component } from "react";
import PropTypes from 'prop-types';
import List from './list';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from './common/menu';
import StringArrayEditor from './model/stringArrayEditorModel';
import StringEditor from './model/stringEditorModel';

class AppHeader extends Component {
    defaultListItems = [{ id: undefined, name: 'All' }, { id: undefined, name: 'Default' }]
    refreshTodoItemDialog = false;

    doFiltering = (filter) => {
        this.props.filterTodos(filter);
    }

    openMenu = (event) => {
        this.props.stateChange({ "showMoreMenuOnHeader": true, "showOn": event.currentTarget });
    }

    handleClose = () => {
        this.props.stateChange({ "showMoreMenuOnHeader": false });
    }

    getListItems() {
        return [...this.defaultListItems, ...this.props.listItems]
    }

    showTodoItems = () => {
        let newItem;
        this.refreshTodoItemDialog = false;
        const state = {
            modelDialogContent: StringArrayEditor,
            openModelDialog: true,
            modelDialogContentProps: {
                entities: this.getListItems()
            },
            modelDialogOkClick: () => {
                this.props.stateChange({ 'openModelDialog': false })
            },
            stateChange: this.props.stateChange,
            additionalModelDialogButtons: [
                {
                    text: "Add Item",
                    onClick: () => {
                        const stringEditorProps = {
                            stringEditorTextboxlabel: "List Name",
                            stringEditorTextboxId: "newListName",
                            stateChange: this.props.stateChange,
                            stringEditorTitle: "Add List",
                            stringEditorValueChange: (value) => {
                                newItem = !Object.keys(value) ? "" : Object.values(value)[0];
                            },
                            stringEditorOkClick: () => {
                                this.props.addTodoItem(newItem);
                                this.refreshTodoItemDialog = true;
                            }
                        }
                        this.props.stateChange({ openStringEditor: true, stringEditorProps: { ...stringEditorProps } });
                    }
                }
            ]
        }
        this.props.stateChange(state);
        this.handleClose();
    }

    getMenuItems() {
        return [{
            name: 'Settings',
            onClick: this.handleClose,
        },
        {
            name: 'Todo items',
            onClick: this.refreshTodoItemDialog ? this.showTodoItems() : this.showTodoItems,
        }]
    }

    getMoreIconButton() {
        return (
            <IconButton color="inherit" onClick={this.openMenu}>
                <MoreIcon />
            </IconButton>
        )
    }

    render() {
        const appHeaderStyles = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }

        return (
            <div>
                <div className="todo-app-header-container" style={appHeaderStyles}>
                    <List items={this.getListItems().map((item) => {
                        return item.name
                    })} defaultValue={this.props.filterText} onChange={this.doFiltering} comboboxHelperText="Todo item"></List>
                    <div className="header-right-side">
                        {this.getMoreIconButton()}
                        <Menu onClose={this.handleClose} show={this.props.showMoreMenuOnHeader} showOn={this.props.showOn} menuItems={this.getMenuItems()}></Menu>
                    </div>

                </div>
                <StringEditor {...this.props.stringEditorProps} openStringEditor={this.props.openStringEditor || false}></StringEditor>
            </div>
        )
    }
}

AppHeader.propTypes = {
    filterTodos: PropTypes.func.isRequired,
    filterText: PropTypes.string,
    stateChange: PropTypes.func.isRequired,
    showMoreMenuOnHeader: PropTypes.bool,
    showOn: PropTypes.any,
    listItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })),
    openStringEditor: PropTypes.bool,
    stringEditorProps: PropTypes.object,
    addTodoItem: PropTypes.func
}

AppHeader.defaultProps = {
    showMoreMenuOnHeader: false,
    listItems: []
}

export default AppHeader;