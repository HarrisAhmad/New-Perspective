import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
import {TextInput, Switch} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ButtonGroup} from 'react-native-elements';

import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import BackPressHandler from '../components/backpresshandler';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import CustomSnackBar from '../components/customsnackbar';

import {
  GetTitle,
  GetCountries,
  InsertPersonalInfo,
} from '../services/apiservice';
import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  USER_NAME,
  GET_PIID,
  SHOWHIDE_SNACKBAR,
} from '../store/actiontypes';
import {ScrollView} from 'react-native-gesture-handler';

const PersonalInfo_Screen = props => {
  const [title, setTitle] = useState([]);
  const [initials, setInitials] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [idNo, setIDNo] = useState('');
  const [nationality, setNationality] = useState([]);
  const [residentCountry, addCountries] = useState([]);
  // const [checked, setChecked] = useState('Male');
  const [checked, setChecked] = useState(true);

  const [genderIndex, setIndex] = useState(0);
  const [status, setStatus] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  //const [UP_ID, setUPID] = useState(0);
  const UP_ID = useRef(null);
  const buttons = [
    {element: () => <Text style={CommonStyles.textstyle}>Male</Text>},
    {element: () => <Text style={CommonStyles.textstyle}>Female</Text>},
  ];
  const userDate = useRef(null);

  const HideKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        getUP_ID();
        GetCountries().then(countries => {
          addCountries(countries);
          setNationality(countries);
        });
        GetTitle().then(title => {
          // console.log('Title' + title);
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
    if (name == '') {
      return 'Enter your name';
    }
    if (surname == '') {
      return 'Enter your Surname';
    }

    if (idNo.current == '') {
      return 'Enter your ID';
    }
    // if (props.userinfo.countriesID <= 0) {
    //   return 'Please select your resident Country';
    // }
    if (props.userinfo.nationalityID <= 0) {
      return 'Please select your national Country';
    }
    return 'true';
  };

  const saveandProceed = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (validate() == 'true') {
          props.getUserName(name, surname);
          checkID();
          setisLoading(true);
          data = {
            UP_ID_FK:
              UP_ID.current == '' || UP_ID.current == null
                ? props.userinfo.UP_ID
                : UP_ID.current,
            T_ID_FK: props.userinfo.titleID,
            PI_Initials: initials,
            PI_Name: name,
            Surname: surname,
            IDNo: idNo,
            COR: 207, //props.userinfo.countriesID,
            CON: props.userinfo.nationalityID,
            Gender: checked == true ? 0 : 1,
          };
          InsertPersonalInfo(data).then(async response => {
            // console.log(response);
            const PI_ID = response.data[0].PI_ID;
            const token = response.access_token;
            storeToken(token);
            await SaveAsyncStorage('PI_ID', PI_ID);
            props.get_PI_ID(PI_ID);
            setisLoading(false);
            props.navigation.dispatch(
              StackActions.replace('ContactDetails Form'),
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

  const storeToken = async jwt => {
    const token = JSON.stringify(jwt);
    try {
      await EncryptedStorage.setItem('user_token', token);
      // console.log("Congrats! You've just stored your first value!");
      // Congrats! You've just stored your first value!
    } catch (error) {
      console.log('ENC ERROR' + error);
      // There was an error on the native side
    }
  };

  const updateIndex = index => {
    setIndex(index);
  };

  // const userBirthday = () => {
  //   if (props.userinfo.Birth_Year != '') {
  //     return GetUserDate(props.userinfo.Birth_Year);
  //   } else {
  //     return 'YYYY/MM/DD';
  //   }
  // };

  const checkID = () => {
    const completeID = idNo.toString();
    if (idNo.length != 13) {
      var currentID = completeID.padStart(13, '0');
      setIDNo(currentID);
    }
  };

  const onToggle = () => {
    setStatus(!status);
    setChecked(!checked);
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
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>PERSONAL INFORMATION</Text>
          </View>
        </View>
        <View style={styles.contentcontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.subheaderstyle}>Primary Member</Text>
          </View>
        </View>
        <ScrollView style={styles.regform}>
          <View
            style={{
              flex: 0.15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'column',
                paddingTop: 10,
              }}>
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
              <TextInput
                style={styles.initialinputstyle}
                underlineColor="transparent"
                label="Initials"
                value={initials}
                theme={{
                  colors: {
                    primary: theme.textinputprimary,
                    placeholder: theme.textinputplaceholder,
                    text: theme.textinputtext,
                  },
                }}
                onChangeText={text => setInitials(text)}
              />
            </View>
          </View>

          <View style={styles.titleinput}>
            <TextInput
              style={CommonStyles.textinputstyle}
              label="Name"
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
              label="Surname"
              underlineColor="transparent"
              value={surname}
              theme={{
                colors: {
                  primary: theme.textinputprimary,
                  placeholder: theme.textinputplaceholder,
                  text: theme.textinputtext,
                },
              }}
              onChangeText={text => setSurname(text)}
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

          {/* <View style={styles.dropdowncontainer}>
            <CustomDropdown
              relation={residentCountry}
              default={'Country of Residence'}
              mode={2}
              isEnabled={false}
              height={210}
            />
          </View> */}

          <View style={styles.dropdowncontainer}>
            <CustomDropdown
              relation={residentCountry}
              default={'Country of Natoinality'}
              mode={3}
              isEnabled={false}
              height={210}
            />
          </View>
          {/* <View style={styles.radiogroup}>
            <ButtonGroup
              onPress={updateIndex}
              selectedButtonStyle={{backgroundColor: theme.primary}}
              selectedIndex={genderIndex}
              buttons={buttons}
              containerStyle={styles.buttongroupstyle}
            />
          </View> */}
          <View style={styles.genderContainer}>
            <Text
              style={{
                flex: 0.8,
                paddingHorizontal: 10,
                paddingLeft: 10,
                textAlign: 'right',
                fontSize: 20,
                color: theme.textcolor,
              }}>
              Male
            </Text>
            <Switch
              color={theme.primary}
              style={styles.switchcontainer}
              value={status}
              onValueChange={onToggle}
            />
            <Text
              style={{
                flex: 0.8,
                paddingHorizontal: 10,
                textAlign: 'left',
                fontSize: 20,
                color: theme.textcolor,
              }}>
              Female
            </Text>
          </View>
        </ScrollView>
        <View style={styles.custombutton}>
          <CustomButton text="PROCEED" onPressEvent={() => saveandProceed()} />
        </View>

        {/* </HideKeyboard> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: 0.1,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  contentcontainer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  regform: {
    flex: 1,
    paddingHorizontal: 7,
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
  },
  titleinput: {
    flex: 0.15,
    flexDirection: 'row',
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
  textinput: {
    flex: 0.25,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  radiogroup: {
    flex: 0.1,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
  },
  buttongroupstyle: {
    flex: 0.5,
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    width: '100%',
    flexDirection: 'row',
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

  radioTextStyle: {
    flex: 0.19,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 16,
  },
  custombutton: {
    flex: 0.15,
    justifyContent: 'center',
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

    get_Data: userData => {
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
    show_DatePickerModal: isDatePickerVisible => {
      dispatch({
        type: SHOWDATEPICKER_MODAL,
        payload: {
          isDatePickerVisible,
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
    get_UserTitle: (title, titleID) => {
      dispatch({
        type: GET_TITLE,
        payload: {
          title,
          titleID,
        },
      });
    },
    get_UserCountries: (countries, countriesID) => {
      dispatch({
        type: GET_COUNTRIES,
        payload: {
          countries,
          countriesID,
        },
      });
    },
    get_UserNationality: (nationality, nationalityID) => {
      dispatch({
        type: GET_NATIONALITY,
        payload: {
          nationality,
          nationalityID,
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
export default connectComponent(PersonalInfo_Screen);
