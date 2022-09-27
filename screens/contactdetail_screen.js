import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {HelperText, Switch} from 'react-native-paper';
import {connect} from 'react-redux';

import theme from '../common/theme';
import BackPressHandler from '../components/backpresshandler';
import CustomButton from '../components/custombutton';
import CommonStyles from '../common/commonstyles';
import {InsertContactInfo, GetDependants} from '../services/apiservice';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
import {CustomTextInput} from '../components/rnp_components';
import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  USER_LOCATION,
  GET_CID,
  SHOWHIDE_SNACKBAR,
  GET_CONTACT_INFO,
} from '../store/actiontypes';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import LoadingIndicator from '../components/loadingindicator_component';

const ContactDetailScreen = props => {
  const [home, setHome] = useState('');
  const [physicalHome, setphysicalHome] = useState('');
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [addressStatus, setaddressStatus] = useState(true);
  const [showAddress, setAddressShow] = useState(true);
  const [doctor, setDoctor] = useState('');
  const [city, setCity] = useState('');
  const [physicalCity, setphysicalCity] = useState('');
  const [province, setProvince] = useState('');
  const [physicalProvince, setPhysicalProvince] = useState('');
  const [stNo, setStNo] = useState('');
  const [physcialStNo, setPhysicalStNo] = useState('');
  const [postal, setPostal] = useState('');
  const [physicalPostal, setPhysicalPostal] = useState('');
  const [docPhoneNumber, setdocPhoneNumber] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const PI_ID = useRef(null);
  const C_ID = useRef(null);
  const UP_ID = useRef(null);
  const isHavingDependant = useRef(0);

  const regex = '^[0-9-+]{10,10}$';
  const postalRegex = '^[0-9-+]{4,4}$';

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
    C_ID.current = await GetAsyncStorageData('C_ID');
    UP_ID.current = await GetAsyncStorageData('UP_ID');
    const data = {
      UP_ID_FK: UP_ID.current,
      isDependantAdded: 0,
    };
    GetDependants(data).then(response => {
      isHavingDependant.current = response.length;
    });
  };

  const validate = () => {
    if (home == '') {
      return 'Enter your house No';
    }
    if (city == '') {
      return 'Enter your City';
    }
    if (province == '') {
      return 'Enter your Province';
    }

    if (postal == '' || !postal.match(postalRegex)) {
      return 'Enter your postal code';
    }

    if (stNo == '') {
      return 'Enter your Street address';
    }

    return 'true';
  };
  const saveInfo = async () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (validate() == 'true') {
          setisLoading(true);
          const data = {
            CID: C_ID.current == null ? 0 : C_ID.current,
            PI_ID_FK:
              PI_ID.current == null ? props.userinfo.PI_ID : PI_ID.current,
            HouseNo: home,
            StreetNo: stNo,
            City: city,
            Province: province,
            Postal: postal,
            PhysicalHouseNo: physicalHome == '' ? home : physicalHome,
            PhysicalStreetNo: physcialStNo == '' ? stNo : physcialStNo,
            PhysicalCity: physicalCity == '' ? city : physicalCity,
            PhysicalProvince:
              physicalProvince == '' ? province : physicalProvince,
            PyhsicalPostal: physicalPostal == '' ? postal : physicalPostal,
            DocName: doctor,
            Doc_Contact: docPhoneNumber,
          };
          InsertContactInfo(data).then(async response => {
            //  console.log(response);
            await SaveAsyncStorage('C_ID', response);
            // saveContact_ID(response);
            props.get_ContactID(response);
            setisLoading(false);

            if (isHavingDependant.current > 0) {
              props.navigation.navigate('Dependant Screen');
            } else {
              await SaveAsyncStorage('isDependantAdded', 1);
              props.navigation.navigate('Payment Details');
            }
          });
        } else {
          alert(validate());
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const onToggle = () => {
    setStatus(!status);
    setShow(!show);
  };

  const onToggleAddress = () => {
    setaddressStatus(!addressStatus);
    setAddressShow(!showAddress);
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {isLoading == true ? <LoadingIndicator /> : null}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      <View style={styles.headercontainer}>
        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.header}>CONTACT DETAILS</Text>
        </View>
      </View>
      <ScrollView style={styles.regform}>
        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.subheaderstyle}> Postal Address</Text>
        </View>
        <View style={styles.titleinput}>
          <CustomTextInput
            style={CommonStyles.textinputstyle}
            keyboardType={'default'}
            label={'House Number'}
            value={home}
            onChange={text => setHome(text)}
          />
        </View>
        <View style={styles.titleinput}>
          <CustomTextInput
            style={CommonStyles.textinputstyle}
            keyboardType={'default'}
            label={'Street Address'}
            value={stNo}
            onChange={text => setStNo(text)}
          />
        </View>
        <View style={styles.titleinput}>
          <CustomTextInput
            style={CommonStyles.textinputstyle}
            keyboardType={'default'}
            label={'City/Town'}
            value={city}
            onChange={text => setCity(text)}
          />
        </View>
        <View style={styles.titleinput}>
          <CustomTextInput
            style={CommonStyles.textinputstyle}
            keyboardType={'default'}
            label={'Province'}
            value={province}
            onChange={text => setProvince(text)}
          />
        </View>
        <View style={styles.titleinput}>
          <CustomTextInput
            style={CommonStyles.textinputstyle}
            keyboardType={'number-pad'}
            label={'Postal Code'}
            value={postal}
            onChange={text => setPostal(text)}
          />
          <HelperText
            type="error"
            visible={postal != '' ? !postal.match(postalRegex) : null}>
            Postal Code in Invalid!
          </HelperText>
        </View>

        <View style={styles.dependantcontainer}>
          <Text style={styles.gpTextStyle}>
            Is your physical address the same as your postal address?
          </Text>
          <Switch
            color={theme.primary}
            style={styles.switchcontainer}
            value={addressStatus}
            onValueChange={onToggleAddress}
          />
        </View>
        {showAddress == false ? (
          <>
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.subheaderstyle}>Physical Address</Text>
            </View>
            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'default'}
                label={'House Number'}
                value={physicalHome}
                onChange={text => setphysicalHome(text)}
              />
            </View>

            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'default'}
                label={'Street Address'}
                value={physcialStNo}
                onChange={text => setPhysicalStNo(text)}
              />
            </View>

            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'default'}
                label={'City/Town'}
                value={physicalCity}
                onChange={text => setphysicalCity(text)}
              />
            </View>

            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'default'}
                label={'Province'}
                value={physicalProvince}
                onChange={text => setPhysicalProvince(text)}
              />
            </View>

            <View style={styles.titleinput}>
              <CustomTextInput
                style={CommonStyles.textinputstyle}
                keyboardType={'number-pad'}
                label={'Postal Code'}
                value={physicalPostal}
                onChange={text => setPhysicalPostal(text)}
              />
              <HelperText
                type="error"
                visible={
                  physicalPostal != ''
                    ? !physicalPostal.match(postalRegex)
                    : null
                }>
                Postal Code in Invalid!
              </HelperText>
            </View>
          </>
        ) : null}
        <View style={{margin: 5}}></View>
        <View style={styles.dependantcontainer}>
          <Text style={styles.gpTextStyle}>Do you currently have a GP?</Text>
          <Switch
            color={theme.primary}
            style={styles.switchcontainer}
            value={status}
            onValueChange={onToggle}
          />
        </View>
        {show == true ? (
          <View style={styles.titleinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'default'}
              label={'Doctor Name'}
              value={doctor}
              onChange={text => setDoctor(text)}
            />
          </View>
        ) : null}
        {show == true ? (
          <View style={styles.titleinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'number-pad'}
              label={'Contact No'}
              placeHolder={'067XXXXXXX'}
              value={docPhoneNumber}
              onChange={text => setdocPhoneNumber(text)}
            />
            <HelperText
              type="error"
              visible={
                docPhoneNumber != '' ? !docPhoneNumber.match(regex) : null
              }>
              Phone Number is invalid!
            </HelperText>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.custombutton}>
        <CustomButton text="PROCEED" onPressEvent={() => saveInfo()} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  regform: {
    flex: 1,
    flexDirection: 'column',
    padding: 2,
    alignSelf: 'stretch',
  },
  headercontainer: {
    flex: 0.1,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  titleinput: {
    flex: 0.15,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  emailinput: {
    flex: 0.15,
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  dependantcontainer: {
    flex: 0.15,
    flexDirection: 'row',
  },
  gpTextStyle: {
    flex: 0.8,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 20,
    color: theme.textcolor,
    fontWeight: 'bold',
  },
  switchcontainer: {flex: 0.2, marginBottom: 10, paddingBottom: 5},
  textinput: {
    flex: 0.25,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  custombutton: {
    justifyContent: 'flex-end',
    marginTop: 6,
    marginBottom: 7,
    flex: 0.2,
    padding: 5,
    flexDirection: 'column',
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
    get_UserRelationship: relationship => {
      dispatch({
        type: GET_RELATIONSHIP,
        payload: {
          relationship,
        },
      });
    },

    get_ContactID: C_ID => {
      dispatch({
        type: GET_CID,
        payload: {
          C_ID,
        },
      });
    },
    get_Contact: Contact => {
      dispatch({
        type: GET_CONTACT_INFO,
        payload: {
          Contact,
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
export default connectComponent(ContactDetailScreen);
