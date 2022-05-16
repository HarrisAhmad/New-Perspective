import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {TextInput, HelperText, Switch} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import theme from '../common/theme';
import GooglePlacesSearchBar from '../components/googleplaces_searchbar';
import BackPressHandler from '../components/backpresshandler';
import CustomButton from '../components/custombutton';
import CommonStyles from '../common/commonstyles';
import {InsertContactInfo} from '../services/apiservice';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
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
import CustomSnackBar from '../components/customsnackbar';

const ContactDetailScreen = props => {
  const [home, setHome] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
  const [doctor, setDoctor] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [stNo, setStNo] = useState('');
  const [postal, setPostal] = useState('');
  const [docPhoneNumber, setdocPhoneNumber] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const PI_ID = useRef(null);

  const regex = '^[0-9-+]{10,10}$';
  const postalRegex = '^[0-9-+]{4,4}$';
  const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getPI_ID();
    //   retrieveUserSession();
  }, []);

  const backHandler = () => {
    // alert('Hello');
  };

  const getPI_ID = async () => {
    PI_ID.current = await GetAsyncStorageData('PI_ID');
  };

  const validate = () => {
    // if (props.userinfo.userlocation == '') {
    //   return 'Please enter your Address';
    // }
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
    if (phoneNumber == '' || !phoneNumber.match(regex)) {
      return 'Enter your  phone number';
    }
    if (stNo == '') {
      return 'Enter your Street address';
    }

    if (email == '') {
      return 'Enter your email';
    }
    // if (doctor == '') {
    //   return 'Please select your Doctor Name';
    // }

    return 'true';
  };
  const saveInfo = async () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        //  retrieveUserSession();
        if (validate() == 'true') {
          setisLoading(true);
          const replacePhoneNumber = phoneNumber.replace(/^0+/, '+27');
          props.get_Contact(replacePhoneNumber);
          const data = {
            PI_ID_FK:
              PI_ID.current == '' || PI_ID.current == null
                ? props.userinfo.PI_ID
                : PI_ID.current,
            Address:
              props.userinfo.userlocation != ''
                ? props.userinfo.userlocation
                : 'N/A',
            HouseNo: home,
            StreetNo: stNo,
            City: city,
            Province: province,
            Postal: postal,
            Contact: replacePhoneNumber,
            Email: email,
            DocName: doctor,
            Doc_Contact: docPhoneNumber,
          };
          // console.log(data);
          InsertContactInfo(data).then(async response => {
            //  console.log(response);
            await SaveAsyncStorage('C_ID', response);
            // saveContact_ID(response);
            props.get_ContactID(response);
            setisLoading(false);
            props.navigation.dispatch(StackActions.replace('Verify OTP'));
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
    console.log(props.userinfo.Birth_Year);
  };

  // const retrieveUserSession = async () => {
  //   try {
  //     const data = await EncryptedStorage.getItem('user_token');

  //     if (data !== undefined) {
  //       console.log("Congrats! You've just retrieved your first value" + data);
  //       // setToken(data);
  //       // Congrats! You've just retrieved your first value!
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // There was an error on the native side
  //   }
  // };
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
      <View style={CommonStyles.subheaderleft}>
        <Text style={CommonStyles.header}>CONTACT DETAILS</Text>
      </View>
      <ScrollView style={styles.regform}>
        {/* <HideKeyboard> */}

        {/* <View style={styles.googlebar}>
            <GooglePlacesSearchBar props={props} isEvent={true} />
          </View> */}
        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.subheaderstyle}>Address</Text>
        </View>
        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="House Number"
            underlineColor="transparent"
            value={home}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setHome(text)}
          />
        </View>

        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="Street Address"
            underlineColor="transparent"
            value={stNo}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setStNo(text)}
          />
        </View>

        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="City/Town"
            underlineColor="transparent"
            value={city}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setCity(text)}
          />
        </View>

        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="Province"
            underlineColor="transparent"
            value={province}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setProvince(text)}
          />
        </View>

        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="Postal Code"
            underlineColor="transparent"
            keyboardType={'number-pad'}
            value={postal}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setPostal(text)}
          />
          <HelperText
            type="error"
            visible={postal != '' ? !postal.match(postalRegex) : null}>
            Postal Code in Invalid!
          </HelperText>
        </View>

        <View style={CommonStyles.subheaderleft}>
          <Text style={CommonStyles.subheaderstyle}>Contact</Text>
        </View>
        <View style={styles.titleinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="Contact No"
            underlineColor="transparent"
            keyboardType={'number-pad'}
            value={phoneNumber}
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
          {/* <View style={{flex: 0.01, backgroundColor: 'green'}}> */}
          <HelperText
            type="error"
            visible={phoneNumber != '' ? !phoneNumber.match(regex) : null}>
            Phone Number is invalid!
          </HelperText>
          {/* </View> */}
        </View>

        <View style={styles.emailinput}>
          <TextInput
            style={CommonStyles.textinputstyle}
            label="Email Address"
            underlineColor="transparent"
            value={email}
            theme={{
              colors: {
                primary: theme.textinputprimary,
                placeholder: theme.textinputplaceholder,
                text: theme.textinputtext,
              },
            }}
            onChangeText={text => setEmail(text)}
          />
          <HelperText
            type="error"
            visible={email != '' ? !email.match(emailRegex) : null}>
            email is invalid!
          </HelperText>
        </View>
        <View style={styles.dependantcontainer}>
          <Text
            style={{
              flex: 0.8,
              paddingHorizontal: 10,
              textAlign: 'left',
              fontSize: 20,
              color: theme.textcolor,
              fontWeight: 'bold',
            }}>
            Do you currently have a GP?
          </Text>
          <Switch
            color={theme.primary}
            style={styles.switchcontainer}
            value={status}
            onValueChange={onToggle}
          />
        </View>
        {show == true ? (
          <View style={styles.titleinput}>
            <TextInput
              style={CommonStyles.textinputstyle}
              label=" Doctor Name"
              underlineColor="transparent"
              value={doctor}
              theme={{
                colors: {
                  primary: theme.textinputprimary,
                  placeholder: theme.textinputplaceholder,
                  text: theme.textinputtext,
                },
              }}
              onChangeText={text => setDoctor(text)}
            />
          </View>
        ) : null}
        {show == true ? (
          <View style={styles.titleinput}>
            <TextInput
              style={CommonStyles.textinputstyle}
              label="Phone Number"
              underlineColor="transparent"
              value={docPhoneNumber}
              placeholder={'067XXXXXXX'}
              theme={{
                colors: {
                  primary: theme.textinputprimary,
                  placeholder: theme.textinputplaceholder,
                  text: theme.textinputtext,
                },
              }}
              onChangeText={text => setdocPhoneNumber(text)}
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
      {/* </HideKeyboard> */}
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

  googlebar: {
    flex: 0.15,
    zIndex: 50,
    backgroundColor: theme.secondary,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#404044',
    paddingTop: 2,
    position: 'relative',
    flexDirection: 'column',
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
  inputstyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.secondary,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.bordercolor,
  },
  emailInputStyle: {
    flex: 0.5,
    paddingHorizontal: 5,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.bordercolor,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  dependantcontainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  switchcontainer: {flex: 0.2, marginBottom: 10, paddingBottom: 5},
  textinput: {
    flex: 0.25,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },

  buttoncontainer: {
    flex: 0.12,
    paddingTop: 5,
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
