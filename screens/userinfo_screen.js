import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';

import DatePicker from '../components/datepicker';
import {Switch, TextInput} from 'react-native-paper';
import theme from '../common/theme';
import {BornText, Dependatnts} from '../common/textcontent';
import CustomButton from '../components/custombutton';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {GetUserDate} from '../common/commonfunctions';
import {connect} from 'react-redux';
import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  HAVING_DEPENDANT,
  SHOWHIDE_SNACKBAR,
  SHOW_DISCLOSURE,
} from '../store/actiontypes';
import {GetDependantRelations} from '../services/apiservice';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import CustomSnackBar from '../components/customsnackbar';
import DisclosureModal from '../components/disclosure_modal';

const UserInfoScreen = props => {
  const [width, setLayout] = useState(0);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState('Select Date');
  const [dependants, addDependants] = useState();
  const [age, setAge] = useState('');
  const [clientData, setClientData] = useState([]);
  const [relationship, addRelations] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    console.log(props.userinfo.relationshipID);
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
  }, []);
  const onToggle = () => {
    setStatus(!status);
    setShow(!show);
    console.log(props.userinfo.Birth_Year);
  };

  onLayout = e => {
    setLayout(e.nativeEvent.layout.width);
  };

  const calculateDependantAmount = () => {
    let dependantAge = '';

    if (age > 20 && age < 56) {
      dependantAge = 355;
      return dependantAge;
    }

    if (age < 21) {
      dependantAge = 138;
      return dependantAge;
    }

    if (age >= 56) {
      dependantAge = 355 + 213;
      return dependantAge;
    }
  };

  const addClientData = () => {
    if (show == true) {
      Keyboard.dismiss();
      if (validate() == 'true') {
        const dependatAmount = calculateDependantAmount();
        const clientDataObj = {
          id: clientData.length + 1,
          relationship: props.userinfo.relationship,
          relationID: props.userinfo.relationshipID,
          age: age,
          dependant_Code: '0' + counter.toString(),
          dependant_Type: age < 18 ? 'C' : 'A',
          dependant_Amount: dependatAmount,
        };
        setClientData([...clientData, clientDataObj]);
        props.get_UserData([...clientData, clientDataObj]);
        setAge('');
        setCounter(counter + 1);
      } else {
        alert(validate());
      }
    }

    // console.log(props.userinfo.userData);
  };

  const validate = () => {
    if (show == true) {
      if (
        props.userinfo.Birth_Year == '' ||
        props.userinfo.Birth_Year == 'YYYY/MM/DD'
      ) {
        return 'Please enter your DOB';
      }
      if (props.userinfo.relationshipID <= 0) {
        return 'Please select relationship';
      }
      if (age == '') {
        return 'Please enter dependant Age';
      }
      return 'true';
    }
    // } else {
    //   if (
    //     props.userinfo.Birth_Year == '' ||
    //     props.userinfo.Birth_Year == 'YYYY/MM/DD'
    //   ) {
    //     return 'Please Enter DOB';
    //   }

    //   return 'true';
    // }
  };

  const renderDependants = item => {
    return (
      <>
        <View style={styles.itemstyle}>
          {/* <Text> {item.id}</Text> */}
          <Text style={CommonStyles.textstyle}> {item.relationship}</Text>
          <Text style={CommonStyles.textstyle}> {item.age}</Text>
        </View>
      </>
    );
  };

  const userBirthday = () => {
    if (props.userinfo.Birth_Year != '') {
      return GetUserDate(props.userinfo.Birth_Year);
    } else {
      return 'YYYY/MM/DD';
    }
  };

  const switchScreen = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (
          props.userinfo.Birth_Year != '' ||
          props.userinfo.Birth_Year != 'YYYY/MM/DD'
        ) {
          props.navigation.navigate('Policy Breakdown');
        } else {
          alert('Please Enter DOB');
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
      {props.modalPopup.isDisclosureShown == true ? <DisclosureModal /> : null}
      {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>GET A QUOTE</Text>
          </View>
        </View>
        <View style={styles.datepickerstyle}>
          <Text style={{flex: 0.43, paddingHorizontal: 5}}>{BornText()}</Text>

          <View style={styles.textinputstyle}>
            <TouchableWithoutFeedback
              activeOpacity={0.4}
              style={CommonStyles.textinputstyle}
              onPress={() => props.show_DatePickerModal(true)}>
              <Text style={CommonStyles.palceholderstyle}>
                {props.modalPopup.isDatePickerVisible == false
                  ? userBirthday()
                  : null}
              </Text>
            </TouchableWithoutFeedback>
            <View>
              {props.modalPopup.isDatePickerVisible == true ? (
                <DatePicker format="DD-MMM-YYYY" mode={0} />
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.dependantcontainer}>
          <Text style={{flex: 0.8, paddingHorizontal: 10}}>
            {Dependatnts()}
          </Text>
          <Switch
            color={theme.primary}
            style={styles.switchcontainer}
            value={status}
            onValueChange={onToggle}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}>
          {show == true ? (
            <>
              <View style={styles.dropdowncontainer}>
                <View style={CommonStyles.dropdownstyle}>
                  <CustomDropdown
                    relation={relationship}
                    default={'Dependants Relationship'}
                    mode={0}
                    isEnabled={false}
                    height={100}
                  />
                </View>
                <View style={styles.textinputContainer}>
                  <View style={styles.textinputStyleContainer}>
                    <TextInput
                      style={CommonStyles.textinputstyle}
                      Type="flat"
                      label="Age"
                      underlineColor="transparent"
                      selectionColor="#0000ffff"
                      outlineColor="#0000ffff"
                      value={age}
                      keyboardType={'number-pad'}
                      onChangeText={text => setAge(text)}
                      theme={{
                        colors: {
                          primary: theme.textinputprimary,
                          placeholder: theme.textinputplaceholder,
                          text: theme.textinputtext,
                        },
                      }}
                    />
                  </View>
                  <View style={styles.custombuttoncontainer}>
                    <CustomButton
                      text="ADD"
                      onPressEvent={() => addClientData()}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.clientdatastyle}>
                <View
                  style={{
                    padding: 0.5,
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.primary,
                  }}
                />
                {clientData != '' ? (
                  <Text style={styles.dependantSummaryStyle}>
                    Dependant Summary
                  </Text>
                ) : null}
                {show == true ? (
                  <FlatList
                    data={props.userinfo.userData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderDependants(item)}
                    //ItemSeparatorComponent={this.renderSeparator}
                  />
                ) : null}
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.buttoncontainer}>
          <CustomButton text=" GET QUOTE" onPressEvent={() => switchScreen()} />
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
    flex: 0.1,
    flexDirection: 'row',
  },
  datepickerstyle: {
    flex: 0.2,
    padding: 20,
    alignContent: 'flex-start',
  },
  datepicker: {
    flex: 1,
    marginTop: 5,
    paddingTop: 5,
    backgroundColor: '#66000000',
    zIndex: -2,
    flexDirection: 'column',
    paddingBottom: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.bordercolor,
  },

  textinputstyle: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.bordercolor,
  },
  textinputContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
  },
  textinputStyleContainer: {
    flex: 0.4,
    flexDirection: 'row',
  },
  custombuttoncontainer: {
    flex: 0.4,
    paddingTop: 19,
  },
  dependantcontainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  switchcontainer: {flex: 0.2, marginBottom: 10, paddingBottom: 5},
  dropdowncontainer: {
    flex: 0.6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'column',
  },
  contactinput: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: '#66000000',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.bordercolor,
  },
  dependantSummaryStyle: {
    padding: 5,
    paddingHorizontal: 8,
    textAlign: 'left',
    fontSize: 18,
    color: theme.textcolor,
    fontWeight: 'bold',
  },
  clientdatastyle: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#66000000',
  },
  itemstyle: {
    flex: 1,
    flexDirection: 'row',
  },
  buttoncontainerstyle: {
    flex: 0.5,
    marginTop: 'auto',
    padding: 10,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  buttoncontainer: {
    justifyContent: 'flex-end',
    paddingVertical: 15,
    flex: 0.2,
    padding: 5,
    marginBottom: 5,
    flexDirection: 'column',
  },
  loginbutton: {
    backgroundColor: '#66000000',
  },
  textstylelogin: {
    color: theme.textcolor,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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

    get_isHavingDependant: isHavingDependant => {
      dispatch({
        type: HAVING_DEPENDANT,
        payload: {
          isHavingDependant,
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
export default connectComponent(UserInfoScreen);
