import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import AdditionalInfoModal from '../components/additionalinfomodal';
import LoadingIndicator from '../components/loadingindicator_component';
import InfoButton from '../components/infobutton_component';
import {CustomTextInput} from '../components/rnp_components';
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
  GET_TERMS_URL,
  SHOW_INFOMODAL,
  SHOWHIDE_SNACKBAR,
} from '../store/actiontypes';

const PaymentDetailScreen = props => {
  const [name, setName] = useState('');
  const [idNo, setIDNo] = useState('');
  const [accNo, setAcc_No] = useState('');
  const [bankName, setBankName] = useState([]);
  const [branchcode, setBranchcode] = useState('');
  const [accType, setAccType] = useState([]);
  const [debitorder, setDebitorder] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const PI_ID = useRef(0);
  const PY_ID = useRef(null);
  const checkBoxRef = useRef();

  useEffect(() => {
    getPI_ID();
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        GetBank().then(bank => {
          setBankName(bank);
        });
        GetDebitOrder().then(debit => {
          setDebitorder(debit);
        });
        GetAccountType().then(account => {
          setAccType(account);
        });
      } else {
        props.isSnackBarShown(true);
      }
    });
  }, []);

  const getPI_ID = async () => {
    props.getLegalURL('https://google.com', 'https://www.youtube.com/');
    PI_ID.current = await GetAsyncStorageData('PI_ID');
    PY_ID.current = await GetAsyncStorageData('isPaymentAdded');
  };

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
    if (idNo.current == '') {
      return 'Enter your ID';
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
    if (checkBoxRef.current.getCheckedState() == false) {
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

  const saveData = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (validate() == 'true') {
          setisLoading(true);
          const data = {
            PID: PY_ID.current == null ? 0 : PY_ID.current,
            PI_ID_FK: PI_ID.current,
            AccountName: name,
            IDNo: idNo,
            AccNo: accNo,
            B_ID_FK: props.userinfo.B_ID_FK,
            BranchCode: branchcode,
            AT_ID_FK: props.userinfo.AT_ID_FK,
            DO_ID_FK: props.userinfo.DO_ID_FK,
          };

          InsertPaymentDetails(data).then(async response => {
            await SaveAsyncStorage('isPaymentAdded', 1);
            setisLoading(false);
            props.navigation.navigate('Fica Questionnaire');
          });
        } else {
          alert(validate());
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {props.modalPopup.isAdditionalInfoVisible == true ? (
        <AdditionalInfoModal mode={2} />
      ) : null}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoading == true ? <LoadingIndicator /> : null}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={styles.headerStyle}>PREMIUM PAYMENT</Text>
          </View>
          <InfoButton onPressEvent={() => getPackageInfo()} flexRange={0.29} />
        </View>
        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.subheaderstyle}>Bank Details</Text>
        </View>
        <ScrollView style={styles.regform}>
          <View style={styles.regform}>
            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'default'}
                label={'Acount Holder Name'}
                value={name}
                onChange={text => setName(text)}
              />
            </View>

            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'default'}
                label={'ID/Passport'}
                value={idNo}
                onChange={text => setIDNo(text)}
              />
            </View>
            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'numeric'}
                label={'Account Number'}
                value={accNo}
                onChange={text => setAcc_No(text)}
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
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'numeric'}
                label={'Branch Code'}
                value={branchcode}
                onChange={text => setBranchcode(text)}
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
            <CheckBoxComponent ref={checkBoxRef} mode={1} />
          </View>
        </ScrollView>
        <View style={styles.buttoncontainer}>
          <View style={styles.custombutton}>
            <CustomButton text="NEXT" onPressEvent={() => saveData()} />
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
  regform: {
    flex: 1,
    paddingHorizontal: 2,
  },

  titleinput: {
    flex: 0.15,
    paddingHorizontal: 2,
    paddingTop: 10,
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
    getLegalURL: (privacyURL, termsURL) => {
      dispatch({
        type: GET_TERMS_URL,
        payload: {
          privacyURL,
          termsURL,
        },
      });
    },
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
