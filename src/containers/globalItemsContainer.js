import GlobalItems from '../components/globalItems';
import { stateChange } from '../actions/index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        confirmationMessage: state.componentsState.confirmationMessage,
        confirmationDialogTitle: state.componentsState.confirmationDialogTitle,
        askConfimation: state.componentsState.askConfimation,
        onConfirmation: state.componentsState.onConfirmation,
        openModelDialog: state.componentsState.openModelDialog,
        modelDialogContent: state.componentsState.modelDialogContent,
        modelDialogContentProps: state.componentsState.modelDialogContentProps,
        onDialogClose: state.componentsState.onDialogClose,
        modelDialogOkClick: state.componentsState.modelDialogOkClick,
        additionalModelDialogButtons: state.componentsState.additionalModelDialogButtons,
        showCancelButton: state.componentsState.showCancelButton,
        okButtonName: state.componentsState.okButtonName,
        onConfirmationDialogClose: state.componentsState.onConfirmationDialogClose,
        onConfirmationCancel: state.componentsState.onConfirmationCancel,
        modelDialogTitle: state.componentsState.modelDialogTitle,
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