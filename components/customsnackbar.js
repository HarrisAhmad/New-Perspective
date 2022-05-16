import React from 'react';
import {connect} from 'react-redux';
import SnackBar from 'react-native-snackbar-component';
import {useEffect} from 'react';

import {SHOWHIDE_SNACKBAR} from '../store/actiontypes';
import theme from '../common/theme';

const CustomSnackBar = props => {
  useEffect(() => {
    setTimeout(() => {
      props.isSnackBarShown(false);
    }, 5000);
  }, []);
  return (
    <>
      {props.modalPopup.isSnackbarShown == true ? (
        <SnackBar
          visible={props.modalPopup.isSnackbarShown}
          position={'top'}
          textMessage="No Internet Connection"
          messageColor={'#ffffff'}
          backgroundColor={theme.primary}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = state => {
  return {
    modalPopup: state.modalPopup,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    isSnackBarShown: isSnackbarShown => {
      dispatch({
        type: SHOWHIDE_SNACKBAR,
        payload: {
          isSnackbarShown,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(CustomSnackBar);
