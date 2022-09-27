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
import {Switch} from 'react-native-paper';
import {connect} from 'react-redux';

import {CustomTextInput} from '../components/rnp_components';
import {
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  SHOWHIDE_SNACKBAR,
  SHOW_DISCLOSURE,
  GET_PRIMARYMEMBER_AGE,
} from '../store/actiontypes';
import theme from '../common/theme';
import DatePicker from '../components/datepicker';
import {BornText, Dependatnts} from '../common/textcontent';
import CustomButton from '../components/custombutton';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import {GetUserDate} from '../common/commonfunctions';
import {GetDependantRelations} from '../services/apiservice';
import {
  CheckInternetConnectivity,
  CalculateAge,
} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import DisclosureModal from '../components/disclosure_modal';
import {Platform} from 'react-native';

const UserInfoScreen = props => {
  const [width, setLayout] = useState(0);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [age, setAge] = useState('');
  const [clientData, setClientData] = useState([]);
  const [relationship, addRelations] = useState([]);
  const [counter, setCounter] = useState(1);

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
  }, []);
  const onToggle = () => {
    setStatus(!status);
    setShow(!show);
  };

  onLayout = e => {
    setLayout(e.nativeEvent.layout.width);
  };

  const addClientData = () => {
    if (show == true) {
      Keyboard.dismiss();
      if (validate() == 'true') {
        const clientDataObj = {
          id: clientData.length + 1,
          relationship: props.userinfo.relationship,
          relationID: props.userinfo.relationshipID,
          age: age,
          dependant_Code: '0' + counter.toString(),
          dependant_Type: props.userinfo.relationship == 'Spouse' ? 'S' : 'C',
          dependant_Amount: 0,
        };
        setClientData([...clientData, clientDataObj]);
        props.get_UserData([...clientData, clientDataObj]);
        setAge('');
        setCounter(counter + 1);
      } else {
        alert(validate());
      }
    }
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
  };

  const renderDependants = item => {
    return (
      <>
        <View style={styles.itemstyle}>
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
          props.userinfo.Birth_Year == '' ||
          props.userinfo.Birth_Year == 'YYYY/MM/DD'
        ) {
          alert('Please Enter DOB');
        } else {
          const calculatedAge = CalculateAge(props.userinfo.Birth_Year);
          props.getPrimraryMemeberAge(calculatedAge);
          props.navigation.navigate('Policy Breakdown');
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
      {/* {props.modalPopup.isDisclosureShown == true ? (
        <DisclosureModal mode={0} />
      ) : null} */}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
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
        <View style={styles.dependantContentContainer}>
          {show == true ? (
            <>
              <View style={styles.dropdowncontainer}>
                <View style={CommonStyles.dropdownstyle}>
                  <CustomDropdown
                    relation={relationship}
                    default={'Dependant Relationship'}
                    mode={0}
                    isEnabled={false}
                    height={100}
                  />
                </View>
                <View style={styles.textinputContainer}>
                  <View style={styles.textinputStyleContainer}>
                    <CustomTextInput
                      style={CommonStyles.textinputstyle}
                      keyboardType={'number-pad'}
                      label={'Age'}
                      value={age}
                      onChange={text => setAge(text)}
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
                <View style={styles.dependantSummaryContainer} />
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
                  />
                ) : null}
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.buttoncontainer}>
          <CustomButton
            text=" GET A QUOTE"
            onPressEvent={() => switchScreen()}
          />
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
    flex: Platform.OS == 'android' ? 0.14 : 0.2,
    flexDirection: 'row',
  },
  datepickerstyle: {
    flex: 0.2,
    padding: 20,
    alignContent: 'flex-start',
  },
  dependantContentContainer: {flexDirection: 'column', flex: 1},
  dependantSummaryContainer: {
    padding: 0.5,
    height: 1,
    width: '100%',
    backgroundColor: theme.primary,
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
  dependantSummaryStyle: {
    padding: 5,
    paddingHorizontal: 8,
    textAlign: 'left',
    fontSize: 18,
    color: theme.textcolor,
    fontWeight: 'bold',
    fontFamily: theme.font,
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

  buttoncontainer: {
    justifyContent: 'flex-end',
    paddingVertical: 15,
    flex: 0.2,
    padding: 5,
    marginBottom: 5,
    flexDirection: 'column',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
    get_UserData: userData => {
      dispatch({
        type: GETUSER_DATA,
        payload: {
          userData,
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
    getPrimraryMemeberAge: primararyMemberAge => {
      dispatch({
        type: GET_PRIMARYMEMBER_AGE,
        payload: {
          primararyMemberAge,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(UserInfoScreen);
