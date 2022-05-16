import React, {useState, useEffect, useRef} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {StackActions} from '@react-navigation/native';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CommonStyles from '../common/commonstyles';
import BackPressHandler from '../components/backpresshandler';
import {VerifyOTP, RegenerateOTP} from '../services/apiservice';
import {GET_CID, SHOWHIDE_SNACKBAR} from '../store/actiontypes';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import CustomSnackBar from '../components/customsnackbar';
import {
  SaveAsyncStorage,
  GetAsyncStorageData,
} from '../common/commonstoragefunc';

const OTP = props => {
  const [otpinput, setOtpinput] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [showResend, setResend] = useState(true);
  const C_ID = useRef(null);

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getStorageData();
  }, []);

  const backHandler = () => {
    // alert('Hello');
  };

  const getStorageData = async () => {
    C_ID.current = await GetAsyncStorageData('C_ID');
  };

  const verifyContactNo = async () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        setisLoading(true);
        const data = {
          C_ID: C_ID.current,
          OTP: otpinput,
        };

        VerifyOTP(data).then(async response => {
          setisLoading(false);
          if (response.Flag == 1) {
            await SaveAsyncStorage('isVerifed', response.Flag.toString());
            props.navigation.dispatch(StackActions.replace('Dependant Screen'));
          } else {
            alert('Invalid OTP');
          }
        });
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const resendOTP = async () => {
    console.log(props.userinfo.Contact);
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        setisLoading(true);
        const data = {
          C_ID: C_ID.current,
          Contact: props.userinfo.Contact,
        };

        RegenerateOTP(data).then(async response => {
          setisLoading(false);
          console.log(response);
          if (response == 'SMS sent') {
            setResend(false);
          }
        });
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const checkinputLength = text => {
    setOtpinput(text);
    if (otpinput != null) {
      if (otpinput.length == 3) {
        Keyboard.dismiss();
      }
    }
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {isLoading == true ? (
        <View
          style={{
            flex: 0.5,
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : null}
      {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <Image
            source={require('../assets/images/npLogoText.png')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 0.35}}>
          <View style={CommonStyles.headerstyle}>
            <Text style={CommonStyles.header}>VERIFICATION</Text>
          </View>
          <View style={CommonStyles.subheaderstyle}>
            <Text style={CommonStyles.subheaderleft}>
              Please enter 4-Digit verification code sent to you via SMS
            </Text>
          </View>
        </View>

        <View style={styles.codecontainer}>
          <OTPTextView
            // ref={e => (otpinput = e)}
            handleTextChange={text => checkinputLength(text)}
            inputCount={4}
            tintColor={theme.primary}
            offTintColor={'#242c30'}
            containerStyle={styles.otpcontainer}
            textInputStyle={styles.inputcontainer}
            keyboardType="numeric"
          />

          {showResend ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.resendButtonStyle}
              onPress={() => resendOTP()}>
              <View style={styles.view}>
                <Text style={styles.textstyle}>Resend OTP</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.buttoncontainer}>
          <View style={styles.custombutton}>
            <CustomButton
              text="VERIFY"
              onPressEvent={() => verifyContactNo()}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.3,
    marginVertical: 15,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  webview: {flex: 1, padding: 16, width: '100%', height: 50},

  codecontainer: {
    flex: 0.6,
    flexDirection: 'column',
    padding: 10,
  },
  otpcontainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignContent: 'flex-start',
    padding: 5,
  },
  inputcontainer: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttoncontainer: {
    flex: 0.1,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  buttoncontainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  custombutton: {
    marginBottom: 1,
    flex: 0.5,
    padding: 5,
    flexDirection: 'column',
  },
  resendButtonStyle: {
    flex: 0.3,
    top: 10,
    justifyContent: 'flex-end',
  },

  textstyle: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 16,
  },
});
const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
    get_ContactID: C_ID => {
      dispatch({
        type: GET_CID,
        payload: {
          C_ID,
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
export default connectComponent(OTP);
