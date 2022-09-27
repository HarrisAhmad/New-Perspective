import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CommonStyles from '../common/commonstyles';
import {InsertBeneficiaryDetails} from '../services/apiservice';
import AdditionalInfoModal from '../components/additionalinfomodal';
import LoadingIndicator from '../components/loadingindicator_component';
import {CustomTextInput} from '../components/rnp_components';
import InfoButton from '../components/infobutton_component';
import BackPressHandler from '../components/backpresshandler';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import {GetDependantRelations} from '../services/apiservice';
import CheckBoxComponent from '../components/checkBoxComponent';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
import {
  SHOW_ADDITIONALINFO_MODAL,
  SHOWHIDE_SNACKBAR,
  SHOW_DISCLOSURE,
  GET_TERMS_URL,
} from '../store/actiontypes';
import DisclosureModal from '../components/disclosure_modal';

const BeneficiaryScreen = props => {
  const [name, setName] = useState('');
  const [idNo, setIDNo] = useState('');
  const [relation, setRelation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [relationship, addRelations] = useState([]);

  const PI_ID = useRef(null);
  const UP_ID = useRef(null);
  const BFID = useRef(null);
  const checkBoxRef = useRef();

  const regex = '^[0-9-+]{10,10}$';

  useEffect(() => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        GetDependantRelations().then(relations => {
          addRelations(relations);
          props.isDisclosureShown(true);
        });
      } else {
        props.isSnackBarShown(true);
      }
    });

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
    BFID.current = await GetAsyncStorageData('isBeneficiaryAdded');
    props.getLegalURL('https://google.com', 'https://www.youtube.com/');
  };

  const validate = () => {
    if (name == '') {
      return 'Enter beneficiary name and surname';
    }
    if (idNo == '') {
      return 'Enter beneficiary ID or Passport';
    }

    if (relation == '') {
      return 'Enter beneficiary Relation';
    }

    if (phoneNumber == '') {
      return 'Enter contact no';
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
  const saveInfo = async () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (validate() == 'true') {
          setisLoading(true);
          checkID();

          const data = {
            BFID: BFID.current == null ? 0 : BFID.current,
            PI_ID_FK:
              PI_ID.current == '' || PI_ID.current == null ? 1 : PI_ID.current,
            BF_Name: name,
            BF_IDNo: idNo,
            BF_Relation: relation,
            BF_ContactNo: phoneNumber,
          };

          InsertBeneficiaryDetails(data).then(async response => {
            await SaveAsyncStorage('isBeneficiaryAdded', response.BF_ID);
            props.navigation.navigate('PolicySummary Screen');
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

  const getPackageInfo = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        props.modalShown(true);
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
        <AdditionalInfoModal mode={3} />
      ) : null}
      {/* {props.modalPopup.isDisclosureShown == true ? (
        <DisclosureModal mode={1} />
      ) : null} */}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoading == true ? <LoadingIndicator /> : null}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={styles.subheaderleft}>
            <Text style={styles.headerStyle}>NOMINATION OF BENEFICIARY</Text>
          </View>
          <InfoButton onPressEvent={() => getPackageInfo()} flexRange={0.13} />
        </View>
        <ScrollView style={styles.regform}>
          <View style={styles.titleinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'default'}
              label={'Full Name'}
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
              keyboardType={'default'}
              label={'Relationship'}
              value={relation}
              onChange={text => setRelation(text)}
            />
          </View>

          <View style={styles.titleinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'number-pad'}
              label={'Contact No'}
              placeHolder={'067XXXXXXX'}
              value={phoneNumber}
              onChange={text => setPhoneNumber(text)}
            />
            <HelperText
              type="error"
              visible={phoneNumber != '' ? !phoneNumber.match(regex) : null}>
              Phone Number is invalid!
            </HelperText>
          </View>

          <View style={styles.rowcontainerstyle}>
            <CheckBoxComponent ref={checkBoxRef} mode={1} />
          </View>
        </ScrollView>
        <View style={styles.buttoncontainer}>
          <View style={styles.custombutton}>
            <CustomButton text="Submit" onPressEvent={() => saveInfo()} />
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
  declareTextStyle: {
    flex: 0.3,
    flexDirection: 'row',
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
    flex: 0.25,
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
    padding: 4,
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
    getLegalURL: (privacyURL, termsURL) => {
      dispatch({
        type: GET_TERMS_URL,
        payload: {
          privacyURL,
          termsURL,
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
    isDisclosureShown: isDisclosureShown => {
      dispatch({
        type: SHOW_DISCLOSURE,
        payload: {
          isDisclosureShown,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(BeneficiaryScreen);
