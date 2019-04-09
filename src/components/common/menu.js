import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Proptypes from 'prop-types';

class MaterialMenu extends Component {

    getMenuItems() {
        return this.props.menuItems.map((menu) => {
            return (
                <MenuItem key={menu.name} onClick={menu.onClick}>{menu.name}</MenuItem>
            )
        })
    }
    render() {
        return (
            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={this.props.showOn}
                    open={this.props.show}
                    onClose={this.props.onClose}
                >
                    {this.getMenuItems()}
                </Menu>
            </div>
        )
    }
}

MaterialMenu.propTypes = {
    show: Proptypes.bool,
    showOn: Proptypes.node.isRequired,
    menuItems: Proptypes.arrayOf(Proptypes.shape({
        name: Proptypes.string,
        onClick: Proptypes.func
    })),
    onClose: Proptypes.func
}

MaterialMenu.defaultProps = {
    show: false,
    onClose: undefined,
    menuItems: []
}

export default MaterialMenu;