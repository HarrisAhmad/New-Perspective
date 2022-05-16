import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Keyboard,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {TextInput, HelperText} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CommonStyles from '../common/commonstyles';
import {InsertBeneficiaryDetails} from '../services/apiservice';
import AdditionalInfoModal from '../components/additionalinfomodal';
import TermsModal from '../components/termsmodal';
import BackPressHandler from '../components/backpresshandler';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import CustomSnackBar from '../components/customsnackbar';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOW_SIGNATUREMODAL,
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  USER_LOCATION,
  SHOW_ADDITIONALINFO_MODAL,
  SHOWHIDE_SNACKBAR,
} from '../store/actiontypes';
import {ScrollView} from 'react-native-gesture-handler';

const BeneficiaryScreen = props => {
  const [name, setName] = useState('');
  const [idNo, setIDNo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const PI_ID = useRef(null);
  const UP_ID = useRef(null);

  const regex = '^[0-9-+]{10,10}$';

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getPI_ID();
  }, []);
  const backHandler = () => {
    // alert('Hello');
  };

  const getPI_ID = async () => {
    PI_ID.current = await GetAsyncStorageData('PI_ID');
    UP_ID.current = await GetAsyncStorageData('UP_ID');
  };

  const HideKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const validate = () => {
    if (name == '') {
      return 'Enter beneficiary name and surname';
    }
    if (idNo == '') {
      return 'Enter beneficiary ID or Passport';
    }

    if (phoneNumber == '') {
      return 'Enter contact no';
    }
    if (isChecked == false) {
      return 'Please check the box below';
    }
    return 'true';
  };

  const checkID = () => {
    const completeID = idNo.toString();
    if (idNo.length != 13) {
      var currentID = completeID.padStart(13, '0');
      setIDNo(currentID);
    }
  };
  const saveInfo = async () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        setisLoading(true);
        if (validate() == 'true') {
          checkID();

          const data = {
            PI_ID_FK:
              PI_ID.current == '' || PI_ID.current == null ? 1 : PI_ID.current,
            BF_Name: name,
            BF_IDNo: idNo,
            BF_ContactNo: phoneNumber,
          };

          InsertBeneficiaryDetails(data).then(async response => {
            // console.log(response);
            await SaveAsyncStorage('isBeneficiaryAdded', 1);
            //  saveisBeneficiaryAdded(1);
            props.signaturemodalShown(true);
            setisLoading(false);
          });
        } else {
          alert(validate());
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  // const saveisBeneficiaryAdded = async isAdded => {
  //   try {
  //     await AsyncStorage.setItem('isBeneficiaryAdded', isAdded.toString());
  //   } catch (e) {
  //     console.log('Error' + e);
  //     alert('Failed to save the data');
  //   }
  // };

  const getPackageInfo = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        props.modalShown(true);
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const onChecked = () => {
    if (isChecked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {props.modalPopup.isAdditionalInfoVisible == true ? (
        <AdditionalInfoModal mode={3} />
      ) : null}
      {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null}
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
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={styles.subheaderleft}>
            <Text style={styles.headerStyle}>NOMINATION OF BENEFICIARY</Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.13,
              paddingTop: 5,
              justifyContent: 'flex-start',
            }}
            onPress={() => getPackageInfo()}>
            <Image
              source={require('../assets/images/infobutton.png')}
              style={styles.infoImage}
            />
          </TouchableOpacity>
        </View>
        {/* <HideKeyboard> */}
        <ScrollView style={styles.regform}>
          <View style={styles.titleinput}>
            <TextInput
              style={CommonStyles.textinputstyle}
              label="Full Name"
              underlineColor="transparent"
              value={name}
              theme={{
                colors: {
                  primary: theme.textinputprimary,
                  placeholder: theme.textinputplaceholder,
                  text: theme.textinputtext,
                },
              }}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.titleinput}>
            <TextInput
              style={CommonStyles.textinputstyle}
              label="ID/Passport"
              underlineColor="transparent"
              value={idNo}
              theme={{
                colors: {
                  primary: theme.textinputprimary,
                  placeholder: theme.textinputplaceholder,
                  text: theme.textinputtext,
                },
              }}
              onChangeText={text => setIDNo(text)}
            />
          </View>

          <View style={styles.titleinput}>
            <TextInput
              style={CommonStyles.textinputstyle}
              label="Contact No"
              underlineColor="transparent"
              value={phoneNumber}
              keyboardType={'number-pad'}
              placeholder={'067XXXXXXX'}
              theme={{
                colors: {
                  primary: theme.textinputprimary,
                  placeholder: theme.textinputplaceholder,
                  text: theme.textinputtext,
                },
              }}
              onChangeText={text => setPhoneNumber(text)}
            />
            <HelperText
              type="error"
              visible={phoneNumber != '' ? !phoneNumber.match(regex) : null}>
              Phone Number is invalid!
            </HelperText>
          </View>
        </ScrollView>
        <View style={styles.rowcontainerstyle}>
          <View style={styles.policydetailcontainer}>
            <TouchableWithoutFeedback
              style={{
                flex: 0.3,
                flexDirection: 'row',
              }}>
              <View style={styles.rowstyle}>
                <Text style={CommonStyles.subheaderleft}>
                  I declare that the contents of the form are true, correct and
                  complete.I have read terms and conditions and I accept the
                  contents thereof.
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.checkboxcontainer}>
            <TouchableOpacity>
              <CheckBox
                center
                checkedIcon={
                  <Image
                    style={styles.checkboximage}
                    source={require('../assets/images/checkedbox.png')}
                  />
                }
                uncheckedIcon={
                  <Image
                    style={styles.checkboximage}
                    source={require('../assets/images/uncheckedbox.png')}
                  />
                }
                checked={isChecked}
                onPress={() => onChecked()}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttoncontainer}>
          <View style={styles.custombutton}>
            <CustomButton text="Submit" onPressEvent={() => saveInfo()} />
          </View>
        </View>
      </View>
      {props.modalPopup.isSignatureModalVisible == true ? (
        <TermsModal state={0} navigation={props.navigation} />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  headerStyle: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start',
    fontSize: 26,
    color: theme.textcolor,
    fontWeight: 'bold',
  },

  subheaderleft: {
    flex: 0.63,
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 8,
    textAlign: 'left',
    fontSize: 18,
    color: theme.textcolor,
    fontWeight: 'normal',
  },
  infoImage: {
    top: 10,
    width: '100%',
    height: 20,
    resizeMode: 'contain',
    padding: 15,
  },

  regform: {
    flex: 1,
    paddingHorizontal: 3,
    flexDirection: 'column',
  },

  titleinput: {
    flex: 0.15,
    paddingHorizontal: 2,
    paddingTop: 10,
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
  rowcontainerstyle: {
    flex: 0.55,
    flexDirection: 'row',
  },
  rowstyle: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  checkboximage: {
    width: 30,
    height: 30,
    padding: 5,
    bottom: 8,
    left: 2,
  },
  policydetailcontainer: {
    flex: 0.8,
  },
  checkboxcontainer: {
    flex: 0.2,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
    get_BirthYear: Birth_Year => {
      dispatch({
        type: GET_BIRTH_YEAR,
        payload: {
          Birth_Year,
        },
      });
    },

    get_UserData: userData => {
      dispatch({
        type: GETUSER_DATA,
        payload: {
          userData,
        },
      });
    },
    signaturemodalShown: isSignatureModalVisible => {
      dispatch({
        type: SHOW_SIGNATUREMODAL,
        payload: {
          isSignatureModalVisible,
        },
      });
    },
    get_UserRelationship: relationship => {
      dispatch({
        type: GET_RELATIONSHIP,
        payload: {
          relationship,
        },
      });
    },

    get_UserLocation: userlocation => {
      dispatch({
        type: USER_LOCATION,
        payload: {
          userlocation,
        },
      });
    },

    show_DatePickerModal: isDatePickerVisible => {
      dispatch({
        type: SHOWDATEPICKER_MODAL,
        payload: {
          isDatePickerVisible,
        },
      });
    },
    modalShown: isAdditionalInfoVisible => {
      dispatch({
        type: SHOW_ADDITIONALINFO_MODAL,
        payload: {
          isAdditionalInfoVisible,
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
export default connectComponent(BeneficiaryScreen);
