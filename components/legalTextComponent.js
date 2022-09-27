import React from 'react';
import {View, Text, Linking} from 'react-native';
import {connect} from 'react-redux';

import CommonStyles from '../common/commonstyles';
import {SHOWHIDE_SNACKBAR} from '../store/actiontypes';

const handlePrivacyLinking = async url => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

const CreateAccountText = props => {
  return (
    <>
      {props.mode == 0 ? (
        <Text style={CommonStyles.subheaderleft}>
          I agree to New Perspective's{' '}
          <Text
            onPress={() => handlePrivacyLinking(props.legalURL.privacyURL)}
            style={{color: 'blue'}}>
            Privacy policy
          </Text>{' '}
          and{' '}
          <Text
            onPress={() => handlePrivacyLinking(props.legalURL.termsURL)}
            style={{color: 'blue'}}>
            Terms of Use
          </Text>
        </Text>
      ) : (
        <Text style={CommonStyles.subheaderleft}>
          I declare that the contents of the form are true, correct and
          complete. I have read the{' '}
          <Text
            onPress={() => handlePrivacyLinking(props.legalURL.privacyURL)}
            style={{color: 'blue'}}>
            terms and conditions
          </Text>{' '}
          and I accept the contents thereof.
        </Text>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {legalURL: state.legalURL};
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
export default connectComponent(CreateAccountText);
