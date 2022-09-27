import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import DatePicker from '../components/datepicker';
import {TextInput, Switch} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CustomButton from '../components/custombutton';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {GetUserDate} from '../common/commonfunctions';
import AdditionalInfoModal from '../components/additionalinfomodal';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import BackPressHandler from '../components/backpresshandler';
import {
  GetAsyncStorageData,
  SaveAsyncStorage,
} from '../common/commonstoragefunc';
import {
  GetDependantRelations,
  InsertDependantDetails,
  GetDependants,
} from '../services/apiservice';
import {
  GET_DEPENDANT_BIRTHYEAR,
  GET_RELATIONSHIP,
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  USER_LOCATION,
  SHOW_ADDITIONALINFO_MODAL,
  SHOWHIDE_SNACKBAR,
} from '../store/actiontypes';

const DependantScreen = props => {
  const [initials, setInitials] = useState('');
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [idNo, setIDNo] = useState('');
  const [genderIndex, setIndex] = useState(0);
  const [relationship, addRelations] = useState([]);
  const [relationID, setRelationID] = useState(0);
  const [D_ID, setD_ID] = useState(0);
  const [isHavingDependant, setDependant] = useState([]);
  const [relationName, setRelationName] = useState('');
  const [isDropDownEnabled, setDropdownStatus] = useState(false);
  const [dependantCode, setDependantCode] = useState(0);
  const [dependantType, setDependantType] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(true);
  const [status, setStatus] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const PI_ID = useRef(null);
  const UP_ID = useRef(null);

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getPI_ID();
  }, [counter]);

  const backHandler = () => {
    // alert('Hello');
  };

  const getPI_ID = async () => {
    try {
      PI_ID.current = await GetAsyncStorageData('PI_ID');
      UP_ID.current = await GetAsyncStorageData('UP_ID');

      const data = {
        UP_ID_FK: UP_ID.current,
        isDependantAdded: 0,
      };
      CheckInternetConnectivity().then(async connection => {
        if (connection == true) {
          GetDependants(data).then(async response => {
            setDependant(response);
            console.log(response);
            // setCounter(response.length);
            if (response.length > 0) {
              setRelationName(response[counter].R_Name);
              setDropdownStatus(true);
              setRelationID(response[counter].R_ID_FK);
              setD_ID(response[counter].D_ID);
              setDependantCode(response[counter].D_DepandantCode);
              setDependantType(response[counter].D_DepandantType);
              setLoaded(true);
            } else {
              await SaveAsyncStorage('isDependantAdded', 1);
              props.navigation.dispatch(
                StackActions.replace('Payment Details'),
              );
            }
          });
        } else {
          props.isSnackBarShown(true);
        }
      });
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  const getDate = () => {
    if (props.userinfo.Dependant_BirthYear != '') {
      return GetUserDate(props.userinfo.Dependant_BirthYear);
    } else {
      return <Text style={{fontFamily: theme.font}}>Enter DOB</Text>;
    }
  };

  const validate = () => {
    if (initials == '') {
      return 'Enter dependant Initials';
    }
    if (name == '') {
      return 'Enter dependant Name/Surname';
    }
    if (
      relationID == 0 &&
      (props.userinfo.relationshipID == 0 ||
        props.userinfo.relationshipID == undefined)
    ) {
      return 'Please enter Relation';
    }
    if (idNo == '') {
      return 'Enter dependant ID or Passport';
    }

    if (props.userinfo.Dependant_BirthYear == '') {
      return 'Enter dependant DOB';
    }

    return 'true';
  };

  const clearFields = () => {
    setInitials('');
    setName('');
    setSurName('');
    setRelationName('');
    setIDNo('');
    props.get_Dependant_BirthYear('');
  };

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

  const addMoreDependant = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (validate() == 'true') {
          checkID();

          const data = {
            D_ID_FK: D_ID > 0 ? D_ID : 0,
            R_ID_FK:
              relationID > 0 ? relationID : props.userinfo.relationshipID,
            PI_ID_FK:
              PI_ID.current == '' || PI_ID.current == null
                ? props.userinfo.PI_ID
                : PI_ID.current,
            DD_Initials: initials,
            DD_Name: name,
            DD_SurName: surName,
            DD_DepandantCode: dependantCode,
            DD_DepandantType: dependantType,
            IDNo: idNo,
            DD_Gender: checked == true ? 0 : 1,
            DOB: getDate(),
          };
          console.log(data);
          setLoaded(false);
          InsertDependantDetails(data).then(async res => {
            const userData = {
              UP_ID_FK: UP_ID.current,
              isDependantAdded: 0,
            };
            GetDependants(userData).then(async response => {
              setDependant(response);
              console.log(response);
              if (response.length > 0) {
                setRelationName(response[counter].R_Name);
                setDropdownStatus(true);
                setRelationID(response[counter].R_ID_FK);
                setD_ID(response[counter].D_ID);
                setDependantCode(response[counter].D_DepandantCode);
                setDependantType(response[counter].D_DepandantType);
                setCounter(counter + 1);
                setLoaded(true);
              } else {
                setLoaded(true);
                await SaveAsyncStorage('isDependantAdded', 1);
                props.navigation.dispatch(
                  StackActions.replace('Payment Details'),
                );
              }
            });
          });
          clearFields();
        } else {
          alert(validate());
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const getPackageInfo = () => {
    props.modalShown(true);
  };
  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {props.modalPopup.isAdditionalInfoVisible == true ? (
        <AdditionalInfoModal mode={1} />
      ) : null}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoaded == true ? (
        <View style={styles.container}>
          <View
            style={{
              flex: 0.15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {isHavingDependant.length > 0 ? (
              <View style={styles.headercontainer}>
                <View style={CommonStyles.subheaderleft}>
                  <Text style={styles.headerStyle}>
                    {relationName.toUpperCase()}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    flex: 0.29,
                    paddingTop: 10,
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                  }}
                  onPress={() => getPackageInfo()}>
                  <Image
                    source={require('../assets/images/infobutton.png')}
                    style={styles.infoImage}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {isHavingDependant.length > 0 ? (
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.paraLeft}>Add dependant details</Text>
            </View>
          ) : null}
          {isHavingDependant.length > 0 ? (
            <ScrollView style={styles.regform}>
              <View style={styles.titleinput}>
                <TextInput
                  style={CommonStyles.textinputstyle}
                  label={<Text style={{fontFamily: theme.font}}>Initials</Text>}
                  underlineColor="transparent"
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
              <View style={styles.titleinput}>
                <TextInput
                  style={CommonStyles.textinputstyle}
                  label={<Text style={{fontFamily: theme.font}}>Name</Text>}
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
                  label={<Text style={{fontFamily: theme.font}}>Surname</Text>}
                  underlineColor="transparent"
                  value={surName}
                  theme={{
                    colors: {
                      primary: theme.textinputprimary,
                      placeholder: theme.textinputplaceholder,
                      text: theme.textinputtext,
                    },
                  }}
                  onChangeText={text => setSurName(text)}
                />
              </View>
              {isDropDownEnabled == false ? (
                <View style={styles.dropdowncontainer}>
                  <CustomDropdown
                    relation={relationship}
                    default={'Select Relationship'}
                    mode={0}
                    isEnabled={isDropDownEnabled}
                    height={100}
                  />
                </View>
              ) : null}

              <View style={styles.titleinput}>
                <TextInput
                  style={CommonStyles.textinputstyle}
                  label={
                    <Text style={{fontFamily: theme.font}}>ID/Passport</Text>
                  }
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

              <View style={styles.datepickerstyle}>
                <View style={styles.textinputstyle}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={CommonStyles.textinputstyle}
                    onPress={() => props.show_DatePickerModal(true)}>
                    <Text style={CommonStyles.subheadercenter}>
                      {getDate()}
                    </Text>
                  </TouchableOpacity>

                  <View>
                    {props.modalPopup.isDatePickerVisible == true ? (
                      <DatePicker format="YYYY-MMM-DD" mode={1} />
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={styles.genderContainer}>
                <Text
                  style={{
                    flex: 0.8,
                    paddingHorizontal: 10,
                    paddingLeft: 10,
                    textAlign: 'right',
                    fontSize: 20,
                    color: theme.textcolor,
                    fontFamily: theme.font,
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
                    fontFamily: theme.font,
                  }}>
                  Female
                </Text>
              </View>
            </ScrollView>
          ) : null}
          {isHavingDependant.length > 0 ? (
            <View style={styles.buttoncontainer}>
              <View style={styles.custombutton}>
                <CustomButton
                  text="Add Dependant"
                  onPressEvent={() => addMoreDependant()}
                />
              </View>
            </View>
          ) : null}
          {/* </HideKeyboard> */}
        </View>
      ) : (
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
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    fontSize: 26,
    color: theme.textcolor,
    fontWeight: 'bold',
  },
  headercontainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  titleinput: {
    flex: 0.15,
    flexDirection: 'row',
    paddingHorizontal: 2,
    paddingTop: 10,
  },
  infoImage: {
    top: 5,
    width: '100%',
    height: 20,
    resizeMode: 'contain',
    padding: 15,
  },
  datepickerstyle: {
    flex: 0.5,
    padding: 10,
    alignContent: 'flex-start',
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
  textinputstyle: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    justifyContent: 'center',
  },

  initialsInput: {
    flex: 0.42,
    paddingHorizontal: 5,
    paddingTop: 5,
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
    flex: 0.1,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
  },
  buttongroupstyle: {
    flex: 0.5,
    height: 50,
    width: '100%',
    flexDirection: 'row',
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

  headerbuttoncontainer: {
    flex: 0.25,
    marginTop: 15,
    justifyContent: 'center',
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
  genderContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  switchcontainer: {margin: 10},
  buttoncontainer: {
    flex: 0.15,
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  textstylelogin: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginbutton: {
    paddingBottom: 10,
    backgroundColor: '#66000000',
  },
  custombutton: {
    marginBottom: 1,
    flex: 0.5,
    padding: 5,
    flexDirection: 'column',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
    get_Dependant_BirthYear: Dependant_BirthYear => {
      dispatch({
        type: GET_DEPENDANT_BIRTHYEAR,
        payload: {
          Dependant_BirthYear,
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
export default connectComponent(DependantScreen);
