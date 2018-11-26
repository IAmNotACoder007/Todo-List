import React, { Component } from 'react';
import ComboBox from '../components/common/combobox';
import PropTypes from 'prop-types';

class List extends Component {
    onChange = (filter) => {
        this.props.onChange(filter);
    }

    getComboItems() {
        let items = ["Default", "Personal", "Shopping"];
        if (this.props.additionalItem && this.props.additionalItem.length) {
            this.props.additionalItem.forEach(item => {
                items.unshift(item);
            });
        }
        return items;
    }

    getDefaultSelected() {
        let defaultValue = this.props.defaultValue;
        if (defaultValue) return defaultValue;
        return this.getComboItems[0];
    }

    render() {
        return (
            <div className="list-items">
                <ComboBox comboboxDefaultValue={this.getDefaultSelected()} comboboxValueChangeHandler={this.onChange} comboboxHelperText={this.props.comboboxHelperText} comboboxMenuItems={this.props.items||[]}></ComboBox>
            </div>
        )
    }
}

List.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    additionalItem: PropTypes.arrayOf(PropTypes.string),
    comboboxHelperText: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string)
}

List.defaultProps = {
    additionalItem: [],
    comboboxHelperText: ''
}

export default List;