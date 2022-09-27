import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import BackPressHandler from '../components/backpresshandler';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import LoadingIndicator from '../components/loadingindicator_component';
// import CustomSnackBar from '../components/customsnackbar';
import CheckBoxComponent from '../components/checkBoxComponent';
import {
  CustomTextInput,
  CustomGenderSwitch,
} from '../components/rnp_components';
import {
  GetTitle,
  GetCountries,
  InsertPersonalInfo,
} from '../services/apiservice';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
  storeJWTToken,
} from '../common/commonstoragefunc';
import {
  USER_NAME,
  GET_PIID,
  SHOWHIDE_SNACKBAR,
  GET_TERMS_URL,
  GET_USER_STATUS,
} from '../store/actiontypes';

const SignupScreen = props => {
  const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';
  const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  const contactRegex = '^[0-9-+]{10,10}$';

  const [title, setTitle] = useState([]);
  const [initials, setInitials] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [nationality, setNationality] = useState([]);
  const [residentCountry, addCountries] = useState([]);
  const [checked, setChecked] = useState(true);
  const [status, setStatus] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const UP_ID = useRef(null);
  const PI_ID = useRef(null);
  const checkBoxRef = useRef();

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        props.getLegalURL('https://google.com', 'https://www.youtube.com/');
        getUP_ID();
        GetCountries().then(countries => {
          addCountries(countries);
          setNationality(countries);
        });
        GetTitle().then(title => {
          setTitle(title);
        });
      } else {
        props.isSnackBarShown(true);
      }
    });
  }, []);

  const backHandler = () => {
    // alert('Hello');
  };

  const getUP_ID = async () => {
    try {
      UP_ID.current = await GetAsyncStorageData('UP_ID');
      PI_ID.current = await GetAsyncStorageData('PI_ID');
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  const validate = () => {
    if (props.userinfo.titleID <= 0) {
      return 'Please select Title';
    }
    if (initials == '') {
      return 'Enter your Initials';
    }
    if (email == '') {
      return 'Enter your email';
    }
    if (password == '') {
      return 'Enter your password';
    }
    if (name == '') {
      return 'Enter your name';
    }
    if (surname == '') {
      return 'Enter your Surname';
    }
    if (contactNo == '') {
      return 'Enter your Contact No';
    }
    if (props.userinfo.nationalityID <= 0) {
      return 'Please select your national Country';
    }

    if (checkBoxRef.current.getCheckedState() == false) {
      return 'Please check the box below';
    }
    return 'true';
  };

  const saveandProceed = () => {
    // getting state from child component
    console.log(checkBoxRef.current.getCheckedState());
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (validate() == 'true') {
          props.getUserName(name, surname);
          setisLoading(true);
          const replacePhoneNumber = contactNo.replace(/^0+/, '+27');
          let data = {
            PInfo_ID: PI_ID.current == null ? 0 : PI_ID.current,
            UP_ID_FK: UP_ID.current == null ? 0 : UP_ID.current,
            T_ID_FK: props.userinfo.titleID,
            PI_Initials: initials,
            PI_Email: email,
            PI_Password: password,
            PI_Name: name,
            PI_Surname: surname,
            PI_ContactNo: replacePhoneNumber,
            PI_CON: props.userinfo.nationalityID,
            PI_Gender: checked == true ? 0 : 1,
          };
          InsertPersonalInfo(data).then(async response => {
            console.log(response.data);
            storeJWTToken(response.access_token);
            await SaveAsyncStorage('PI_ID', response.data);
            props.get_PI_ID(response.data);
            props.getUserLoggedInStatus(true);
            await SaveAsyncStorage('UserLoggedIn', 'true');
            setisLoading(false);
            props.navigation.replace('Home');
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
    setChecked(!checked);
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
            <Text style={CommonStyles.header}>CREATE YOUR ACCOUNT</Text>
          </View>
        </View>
        <ScrollView style={styles.regform}>
          <View style={styles.firstContainer}>
            <View style={styles.dropdownContanier}>
              <View style={CommonStyles.dropdownPersonalStyle}>
                <CustomDropdown
                  relation={title}
                  default={'Select Title'}
                  mode={1}
                  isEnabled={false}
                  height={170}
                />
              </View>
            </View>

            <View style={styles.initialsInput}>
              <CustomTextInput
                style={styles.initialinputstyle}
                keyboardType={'default'}
                label={'Initial'}
                value={initials}
                onChange={text => setInitials(text)}
              />
            </View>
          </View>

          <View style={styles.emailinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'email-address'}
              label={'Email Address'}
              placeHolder={'example@example.com'}
              value={email}
              onChange={text => setEmail(text)}
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
              placeHolder={'For example: Password1'}
              value={password}
              onChange={text => setPassword(text)}
            />
            {!password.match(passwordRegex) && password != '' ? (
              <HelperText
                type="error"
                visible={
                  password != '' ? !password.match(passwordRegex) : null
                }>
                Password must contain: Numbers(0-9),Uppercase letter(A-Z) and be
                8 characters long!
              </HelperText>
            ) : null}
          </View>
          <View style={styles.titleinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'default'}
              label={'Name'}
              value={name}
              onChange={text => setName(text)}
            />
          </View>

          <View style={styles.titleinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'default'}
              label={'Surname'}
              value={surname}
              onChange={text => setSurname(text)}
            />
          </View>

          <View style={styles.emailinput}>
            <CustomTextInput
              style={CommonStyles.textinputstyle}
              keyboardType={'number-pad'}
              label={'Contact No'}
              placeHolder={'067XXXXXXX'}
              value={contactNo}
              onChange={text => setContactNo(text)}
            />
            {contactNo != '' && !contactNo.match(contactRegex) ? (
              <HelperText
                type="error"
                visible={
                  contactNo != '' ? !contactNo.match(contactRegex) : null
                }>
                Phone Number is invalid!
              </HelperText>
            ) : null}
          </View>
          <View style={styles.dropdowncontainer}>
            <CustomDropdown
              relation={residentCountry}
              default={'Country of Natoinality'}
              mode={3}
              isEnabled={false}
              height={210}
            />
          </View>
          <View style={styles.genderContainer}>
            <CustomGenderSwitch
              style={styles.switchcontainer}
              value={status}
              toggle={() => onToggle()}
            />
          </View>
          <CheckBoxComponent ref={checkBoxRef} mode={0} />
        </ScrollView>
        <View style={styles.custombutton}>
          <CustomButton text="PROCEED" onPressEvent={() => saveandProceed()} />
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
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownContanier: {
    flex: 0.5,
    flexDirection: 'column',
    paddingTop: 10,
  },
  headercontainer: {
    flex: 0.1,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  emailinput: {
    flex: 0.15,
    paddingTop: 10,
    paddingHorizontal: 2,
  },
  contentcontainer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  regform: {
    flex: 1,
    paddingHorizontal: 5,
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

  initialsInput: {
    flex: 0.45,
    flexDirection: 'column',
    paddingHorizontal: 1,
    paddingTop: 10,
  },
  initialinputstyle: {
    flex: 0.1,
    padding: 0,
    maxHeight: 52,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.bordercolor,
    fontFamily: theme.font,
  },
  titleinput: {
    flex: 0.15,
    flexDirection: 'row',
    paddingHorizontal: 2,
    paddingTop: 10,
  },
  genderContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  switchcontainer: {margin: 10},
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
    getLegalURL: (privacyURL, termsURL) => {
      dispatch({
        type: GET_TERMS_URL,
        payload: {
          privacyURL,
          termsURL,
        },
      });
    },
    get_PI_ID: PI_ID => {
      dispatch({
        type: GET_PIID,
        payload: {
          PI_ID,
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
export default connectComponent(SignupScreen);
