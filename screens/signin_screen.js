import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {HelperText} from 'react-native-paper';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import {VerifyCredential, RecoverPassword} from '../services/apiservice';
import CommonStyles from '../common/commonstyles';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import LoadingIndicator from '../components/loadingindicator_component';
// import CustomSnackBar from '../components/customsnackbar';
import {CustomTextInput} from '../components/rnp_components';
import {
  USER_NAME,
  SHOWHIDE_SNACKBAR,
  GET_USER_STATUS,
} from '../store/actiontypes';

const SigninScreen = props => {
  const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [recoveryEmail, setRecoveryEmail] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = () => {
    const data = {
      Email: email,
      UPassword: password,
    };
    VerifyCredential(data).then(result => {
      console.log(result);
      if (result.UserAuth == 0) {
        setErrorMessage('Error');
      }
      if (result.UserAuth == 1) {
        setErrorMessage(null);
        props.navigation.navigate('Home');
      }
    });
  };

  const handlePasswordReset = async () => {
    if (email != '' && email.match(emailRegex)) {
      setisLoading(true);
      const data = {
        Email: email,
      };
      await RecoverPassword(data).then(res => {
        console.log(res);
        setisLoading(false);
      });
    } else {
      setRecoveryEmail(true);
    }
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {isLoading == true ? <LoadingIndicator /> : null}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>LOGIN YOUR ACCOUNT</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.emailinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'email-address'}
              label={'Email Address'}
              placeHolder={'Enter your email'}
              value={email}
              onChange={text => {
                setEmail(text);
                setRecoveryEmail(null);
              }}
            />
            {!email.match(emailRegex) && email != '' ? (
              <HelperText
                type="error"
                visible={email != '' ? !email.match(emailRegex) : null}>
                email is invalid!
              </HelperText>
            ) : null}
          </View>
          <View style={styles.emailinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'default'}
              label={'Password'}
              placeHolder={'Enter your password'}
              value={password}
              onChange={text => setPassword(text)}
            />
            {errorMessage != null ? (
              <HelperText
                type="error"
                visible={errorMessage != null ? errorMessage : null}>
                Incorrect Email or Password.
              </HelperText>
            ) : null}
          </View>
          <View style={styles.infoText}>
            <Text
              style={[CommonStyles.paraLeft, {color: 'blue'}]}
              onPress={() => handlePasswordReset()}>
              Forgot Password?
            </Text>
            {recoveryEmail != null && email == '' ? (
              <HelperText
                type="error"
                visible={
                  recoveryEmail != null && email == '' ? recoveryEmail : null
                }>
                Please enter your email!
              </HelperText>
            ) : null}
            <Text style={CommonStyles.paraLeft}>
              Dont have an Account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => props.navigation.navigate('Signup')}>
                Signup
              </Text>{' '}
              here
            </Text>
          </View>
        </View>
        <View style={styles.custombutton}>
          <CustomButton text="LOGIN" onPressEvent={() => handleLogin()} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headercontainer: {
    flex: 0.1,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 5,
  },
  emailinput: {
    flex: 0.15,
    paddingTop: 10,
    paddingHorizontal: 2,
  },

  infoText: {
    flex: 0.2,
    marginTop: 10,
    paddingVertical: 10,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  custombutton: {
    flex: 0.15,
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'column',
  },
});

const mapStateToProps = state => {
  return {
    userinfo: state.userinfo,
    modalPopup: state.modalPopup,
    legalURL: state.legalURL,
    userStatus: state.userStatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserLoggedInStatus: isUserLoggedIn => {
      dispatch({
        type: GET_USER_STATUS,
        payload: {
          isUserLoggedIn,
        },
      });
    },
    getUserName: (userName, surName) => {
      dispatch({
        type: USER_NAME,
        payload: {
          userName,
          surName,
        },
      });
    },

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
export default connectComponent(SigninScreen);
