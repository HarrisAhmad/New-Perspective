import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import CustomSnackBar from '../components/customsnackbar';
import AdditionalInfoModal from '../components/additionalinfomodal';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
import {
  GetBank,
  GetDebitOrder,
  GetAccountType,
  InsertPaymentDetails,
} from '../services/apiservice';
import {connect} from 'react-redux';
import {
  SHOW_ADDITIONALINFO_MODAL,
  SHOWDATEPICKER_MODAL,
  SHOW_INFOMODAL,
  SHOWHIDE_SNACKBAR,
} from '../store/actiontypes';

const PaymentDetailScreen = props => {
  const [name, setName] = useState('');
  const [accNo, setAcc_No] = useState('');
  const [bankName, setBankName] = useState([]);
  const [branchcode, setBranchcode] = useState('');
  const [checkTerms, setCheck] = useState(false);
  const [getTerms, setTerms] = useState(false);
  const [accType, setAccType] = useState([]);
  const [debitorder, setDebitorder] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const PI_ID = useRef(0);

  useEffect(() => {
    getPI_ID();
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        GetBank().then(bank => {
          //  console.log('Bank' + bank);
          setBankName(bank);
        });
        GetDebitOrder().then(debit => {
          // console.log('Bank' + debit);
          setDebitorder(debit);
        });
        GetAccountType().then(account => {
          // console.log('Bank' + account);
          setAccType(account);
        });
      } else {
        props.isSnackBarShown(true);
      }
    });
  }, []);

  const getPI_ID = async () => {
    PI_ID.current = await GetAsyncStorageData('PI_ID');
  };

  const HideKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const getPackageInfo = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        props.additionalmodalShown(true);
      } else {
        props.isSnackBarShown(true);
      }
    });
  };
  const validate = () => {
    if (name == '') {
      return 'Enter Account Holder Name';
    }
    if (accNo == '') {
      return 'Please enter Account No';
    }
    if (props.userinfo.B_ID_FK == 0) {
      return 'Select your Bank';
    }

    if (branchcode == '') {
      return 'Enter Branch code';
    }

    if (props.userinfo.AT_ID_FK == 0) {
      return 'Select your Account Type';
    }

    if (props.userinfo.DO_ID_FK == 0) {
      return 'Select your Debit Order Date';
    }
    if (isChecked == false) {
      return 'Please check the box below';
    }
    return 'true';
  };

  const saveData = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        setisLoading(true);
        if (validate() == 'true') {
          const data = {
            PI_ID_FK: PI_ID.current,
            AccountName: name,
            AccNo: accNo,
            B_ID_FK: props.userinfo.B_ID_FK,
            BranchCode: branchcode,
            AT_ID_FK: props.userinfo.AT_ID_FK,
            DO_ID_FK: props.userinfo.DO_ID_FK,
          };

          InsertPaymentDetails(data).then(async response => {
            await SaveAsyncStorage('isPaymentAdded', 1);
            setisLoading(false);
            props.navigation.dispatch(
              StackActions.replace('Fica Questionnaire'),
            );
          });
        } else {
          alert(validate());
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  // const saveisPaymentAdded = async isAdded => {
  //   try {
  //     await AsyncStorage.setItem('isPaymentAdded', isAdded.toString());
  //   } catch (e) {
  //     console.log('Error' + e);
  //     alert('Failed to save the data');
  //   }
  // };
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
        <AdditionalInfoModal mode={2} />
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
          <View style={CommonStyles.subheaderleft}>
            <Text style={styles.headerStyle}>PREMIUM PAYMENT</Text>
          </View>

          <TouchableOpacity
            style={{
              flex: 0.29,
              paddingTop: 9,
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
            }}
            onPress={() => getPackageInfo()}>
            <Image
              source={require('../assets/images/infobutton.png')}
              style={styles.infoImage}
            />
          </TouchableOpacity>

          {/* <View style={styles.headerbuttoncontainer}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.loginbutton}
              onPress={() => skipToNext()}>
              <Text style={styles.textstylelogin}>SKIP</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.subheaderstyle}>Bank Details</Text>
        </View>
        <ScrollView style={styles.regform}>
          {/* <HideKeyboard> */}
          <View style={styles.regform}>
            <View style={styles.titleinput}>
              <TextInput
                style={CommonStyles.textinputstyle}
                label="Acount Holder Name"
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
                label="Account Number"
                underlineColor="transparent"
                value={accNo}
                keyboardType={'numeric'}
                theme={{
                  colors: {
                    primary: theme.textinputprimary,
                    placeholder: theme.textinputplaceholder,
                    text: theme.textinputtext,
                  },
                }}
                onChangeText={text => setAcc_No(text)}
              />
            </View>

            <View style={styles.dropdowncontainer}>
              <CustomDropdown
                relation={bankName}
                default={'Select Bank'}
                mode={4}
                height={210}
              />
            </View>

            <View style={styles.titleinput}>
              <TextInput
                style={CommonStyles.textinputstyle}
                label="Branch Code"
                underlineColor="transparent"
                keyboardType={'numeric'}
                value={branchcode}
                theme={{
                  colors: {
                    primary: theme.textinputprimary,
                    placeholder: theme.textinputplaceholder,
                    text: theme.textinputtext,
                  },
                }}
                onChangeText={text => setBranchcode(text)}
              />
            </View>

            <View style={styles.dropdowncontainer}>
              <CustomDropdown
                relation={accType}
                default={'Account Type'}
                mode={5}
                height={140}
              />
            </View>

            <View style={styles.dropdowncontainer}>
              <CustomDropdown
                relation={debitorder}
                default={'Debit Order Date'}
                mode={6}
                height={140}
              />
            </View>
          </View>
          <View style={styles.rowcontainerstyle}>
            <View style={styles.policydetailcontainer}>
              <TouchableWithoutFeedback
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                }}>
                <View style={styles.rowstyle}>
                  <Text style={CommonStyles.subheaderleft}>
                    I declare that the contents of the form are true, correct
                    and complete.I have read terms and conditions and I accept
                    the contents thereof.
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
                      source={require('../assets/images/checkboxwhite.png')}
                    />
                  }
                  checked={isChecked}
                  onPress={() => onChecked()}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttoncontainer}>
          <View style={styles.custombutton}>
            <CustomButton text="NEXT" onPressEvent={() => saveData()} />
          </View>
          {/* </HideKeyboard> */}
        </View>
      </View>
      {/* {props.modalPopup.isSignatureModalVisible == true ? (
        <TermsModal state={0} navigation={props.navigation} />
      ) : null} */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.15,
    flexDirection: 'row',
  },
  headerStyle: {
    paddingTop: 5,
    justifyContent: 'flex-start',
    fontSize: 26,
    color: theme.textcolor,
    fontWeight: 'bold',
  },
  infoImage: {
    top: 5,
    width: '100%',
    height: 20,
    resizeMode: 'contain',
    padding: 15,
  },

  headerbuttoncontainer: {
    flex: 0.5,
    justifyContent: 'center',
    paddingTop: 5,
  },

  textstylelogin: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginbutton: {
    paddingBottom: 10,
    backgroundColor: '#66000000',
  },
  regform: {
    flex: 1,
    paddingHorizontal: 2,
  },

  titleinput: {
    flex: 0.15,
    paddingHorizontal: 2,
    paddingTop: 10,
  },
  inputstyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.secondary,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.bordercolor,
  },

  radiogroup: {
    flex: 0.12,
    flexDirection: 'row',
    paddingTop: 5,
  },
  radioTextStyle: {
    flex: 0.19,
    marginTop: 6,
    justifyContent: 'flex-start',
    color: 'black',
    fontSize: 16,
  },
  textinput: {
    flex: 0.25,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  dropdowncontainer: {
    flex: 1,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.bordercolor,
  },

  buttoncontainer: {
    flex: 0.15,
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 8,
  },

  buttonstyle: {
    flex: 0.5,
    flexDirection: 'row',
  },
  radioTextStyle: {
    flex: 0.19,
    marginTop: 6,
    justifyContent: 'flex-start',
    color: 'black',
    fontSize: 16,
  },
  custombutton: {
    marginBottom: 1,
    flex: 0.5,
    padding: 5,
    flexDirection: 'column',
  },
  rowcontainerstyle: {
    flex: 1,
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
    paddingTop: 12,
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
    additionalmodalShown: isAdditionalInfoVisible => {
      dispatch({
        type: SHOW_ADDITIONALINFO_MODAL,
        payload: {
          isAdditionalInfoVisible,
        },
      });
    },

    modalShown: isModalVisible => {
      dispatch({
        type: SHOW_INFOMODAL,
        payload: {
          isModalVisible,
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
export default connectComponent(PaymentDetailScreen);
