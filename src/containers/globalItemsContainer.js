import GlobalItems from '../components/globalItems';
import { stateChange } from '../actions/index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        confirmationMessage: state.componentsState.confirmationMessage,
        confirmationDialogTitle: state.componentsState.confirmationDialogTitle,
        askConfimation: state.componentsState.askConfimation,
        onConfirmation: state.componentsState.onConfirmation,
        changeState: state.componentsState.changeState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        stateChange: (state) => {
            dispatch(stateChange(state))
        }
    }
}

const GlobalItemsContainer = connect(mapStateToProps, mapDispatchToProps)(GlobalItems)
export default GlobalItemsContainer;