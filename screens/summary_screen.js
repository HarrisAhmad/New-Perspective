import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {StackActions} from '@react-navigation/native';

import {InsertUserPolicy, InsertUserDependants} from '../services/apiservice';
import {SaveAsyncStorage} from '../common/commonstoragefunc';
import CustomButton from '../components/custombutton';
import PolicyInfoModal from '../components/poliicyinfomodal';
import CommonStyles from '../common/commonstyles';
import {GetUserDate, GetPolicyBenifitDate} from '../common/commonfunctions';
import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOW_INFOMODAL,
  GETUSER_DATA,
  GET_UPID,
  SHOWHIDE_SNACKBAR,
} from '../store/actiontypes';
import {CheckInternetConnectivity} from '../common/commonfunctions';
import CustomSnackBar from '../components/customsnackbar';
import theme from '../common/theme';

const MonthlySummaryScreenn = props => {
  const didMountRef = useRef(false);
  const [selectedPolicy, setSelectedPolicy] = useState([]);
  const [dependantData, setDependantData] = useState(props.userinfo.userData);
  const [isDependantDataLoaded, setDependantDataLoaded] = useState(false);
  const [policy, setPolicy] = useState([
    {ID: 1, policy: 'Primary Care', checked: true, amount: 390},
    {ID: 2, policy: 'Hospital Care', checked: true, amount: 167},
  ]);
  const [policyamount, setPolicyAmount] = useState(495);
  const [discountedPolicyAmount, setDiscountedPolicyAmount] = useState(495);
  const [isLoading, setisLoading] = useState(false);

  const primarycare = useRef(true);
  const hospitalcare = useRef(true);
  const isChecked = useRef(true);

  useEffect(() => {
    if (didMountRef.current) {
      if (props.userinfo.userData != null || props.userinfo.userData != '') {
        calculatePolicyAmount();
      }
    } else {
      didMountRef.current = true;
      if (props.userinfo.userData != null || props.userinfo.userData != '') {
        calculatePolicyAmount();
      }
    }
  }, [isDependantDataLoaded, dependantData]);

  const startApplication = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (isChecked.current == true) {
          insertData();
        } else {
          alert('Plase select policy First');
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const renderItems = (item, index) => {
    return (
      <>
        <View style={styles.itemcontainer}>
          <View style={styles.rowcontainerstyle}>
            <View style={styles.policydetailcontainer}>
              <TouchableWithoutFeedback
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                }}>
                <View style={styles.rowstyle}>
                  <Text style={CommonStyles.subheaderleft}>{item.policy}</Text>
                  <Text style={CommonStyles.subheaderleft}>
                    R{item.amount} p/m
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.checkboxcontainer}>
              <TouchableOpacity key={index}>
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
                      source={require('../assets/images/uncheckedbox.png')}
                    />
                  }
                  checked={item.checked}
                  onPress={() => onChecked(item, index)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  const onChecked = async (item, index) => {
    policy.map(newItem => {
      if (newItem.ID === item.ID) {
        newItem.checked = !newItem.checked;

        const i = selectedPolicy.indexOf(newItem);
        if (newItem.checked === false) {
          setSelectedPolicy(selectedPolicy => [...selectedPolicy, newItem]); // push Item
          //  console.log('UNSELECT:' + newItem.ID + newItem.checked);
          if (index == 0) {
            primarycare.current = false;
            isChecked.current = false;
          }
          if (index == 1) {
            hospitalcare.current = false;
            isChecked.current = false;
          }

          calculatePolicyAmount();
        }
        if (newItem.checked === true) {
          setSelectedPolicy(selectedPolicy => [
            ...selectedPolicy,
            selectedPolicy.splice(i, 1),
          ]);
          //     console.log('SELECT:' + newItem.ID + newItem.checked);
          if (index == 0) {
            primarycare.current = true;
            isChecked.current = true;
          }
          if (index == 1) {
            hospitalcare.current = true;
            isChecked.current = true;
          }

          calculatePolicyAmount();
          return selectedPolicy;
        }
      }
    });
  };

  const calculatePolicyAmount = () => {
    let dependant_Array = [];
    dependant_Array = props.userinfo.userData;
    if (dependant_Array == null || dependant_Array == '') {
      if (primarycare.current == true && hospitalcare.current == true) {
        setPolicyAmount(495);
      } else if (primarycare.current == true && hospitalcare.current == false) {
        setPolicyAmount(390);
      } else if (primarycare.current == false && hospitalcare.current == true) {
        setPolicyAmount(167);
      } else if (
        primarycare.current == false &&
        hospitalcare.current == false
      ) {
        setPolicyAmount(0);
      }
    }

    if (dependant_Array != null) {
      if (primarycare.current == true && hospitalcare.current == true) {
        setPolicyAmount(495);
        setDiscountedPolicyAmount(495);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            setPolicyAmount(policyamount => policyamount + 355);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 355};
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            setPolicyAmount(policyamount => policyamount + 138);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 138};
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age >= 56) {
            setPolicyAmount(policyamount => policyamount + 355 + 213);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 571};
            setDependantData(dependant_Array);
          }
        }
      } else if (primarycare.current == true && hospitalcare.current == false) {
        setPolicyAmount(390);
        setDiscountedPolicyAmount(390);
        // if (isChecked.current == true) {
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            setPolicyAmount(policyamount => policyamount + 260);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 260};
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            setPolicyAmount(policyamount => policyamount + 115);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 115};
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age >= 56) {
            setPolicyAmount(policyamount => policyamount + 260 + 183);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 443};
            setDependantData(dependant_Array);
          }
        }
      } else if (primarycare.current == false && hospitalcare.current == true) {
        setPolicyAmount(167);
        setDiscountedPolicyAmount(167);
        // if (isChecked == true) {
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            setPolicyAmount(policyamount => policyamount + 90);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 90};
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            setPolicyAmount(policyamount => policyamount + 37);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 37};
            setDependantData(dependant_Array);
          }
          if (dependant_Array[i].age >= 56) {
            setPolicyAmount(policyamount => policyamount + 90 + 43);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 133};
            setDependantData(dependant_Array);
          }
        }
      } else if (
        primarycare.current == false &&
        hospitalcare.current == false
      ) {
        setPolicyAmount(0);
        setDiscountedPolicyAmount(0);
      }
      setDependantDataLoaded(true);
    }
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

  const insertData = async () => {
    setisLoading(true);
    let policyID = 0;
    if (primarycare.current && !hospitalcare.current) {
      policyID = 1;
    }
    if (primarycare.current && hospitalcare.current) {
      policyID = 2;
    }
    if (!primarycare.current && hospitalcare.current) {
      policyID = 4;
    }

    const benefitDate = GetPolicyBenifitDate();
    let data = {
      P_ID_FK: policyID,
      DOB: GetUserDate(props.userinfo.Birth_Year),
      Amount: policyamount.toString(),
      HavingDependant: props.userinfo.userData == '' ? 0 : 1,
      BenifitDate: benefitDate,
    };

    //console.log(data);
    if (props.userinfo.userData == '' || props.userinfo.userData == null) {
      InsertUserPolicy(data).then(async response => {
        console.log('UPID' + response.UserPolicy_ID);
        console.log('PolicyNumber', response.PolicyNumber);

        const UserP_ID = response.UserPolicy_ID;
        await SaveAsyncStorage('UP_ID', UserP_ID.toString());
        await SaveAsyncStorage(
          'UserPolicy_Number',
          response.PolicyNumber.toString(),
        );
        //  saveUPolicy_ID(UserP_ID);
        props.get_UP_ID(UserP_ID);
        setisLoading(false);
        props.navigation.dispatch(StackActions.replace('PersonalInfo Screen'));
      });
    } else {
      let dependantArray = [];
      InsertUserPolicy(data).then(async response => {
        const UserP_ID = response.UserPolicy_ID;
        console.log('PolicyNumber', response.PolicyNumber);
        console.log('UP', UserP_ID);

        await SaveAsyncStorage('UP_ID', UserP_ID.toString());
        await SaveAsyncStorage(
          'UserPolicy_Number',
          response.PolicyNumber.toString(),
        );
        props.get_UP_ID(UserP_ID);

        for (let i = 0; i < props.userinfo.userData.length; i++) {
          let userData = {
            R_ID_FK: props.userinfo.userData[i].relationID,
            UP_ID_FK: UserP_ID,
            Age: props.userinfo.userData[i].age,
            isAdult: props.userinfo.userData[i].age >= 21 ? 1 : 0,
            D_DepandantCode: props.userinfo.userData[i].dependant_Code,
            D_DepandantType: props.userinfo.userData[i].dependant_Type,
          };
          dependantArray.push(userData);
        }
        // console.log(dependantArray);
        InsertUserDependants(dependantArray).then(() => {
          setisLoading(false);
          props.navigation.dispatch(
            StackActions.replace('PersonalInfo Screen'),
          );
        });
      });
    }
  };

  const renderDependants = item => {
    return (
      <>
        <View style={styles.itemstyle}>
          <Text style={CommonStyles.textstyle}> {item.relationship}</Text>
          <Text style={CommonStyles.textstyle}> {item.age}</Text>
          <Text style={CommonStyles.textstyle}>
            {item.dependant_Amount} p/m
          </Text>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.removebutton}
            onPress={() => removeDependants(item)}>
            <Image
              source={require('../assets/images/deletedependant.png')}
              style={styles.deleteImage}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const removeDependants = item => {
    const data = dependantData.filter(data => {
      return data.id !== item.id;
    });
    //  console.log(data);
    setDependantData(data);
    props.get_UserData(data);
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          padding: 20,
          height: 1,
          width: '100%',
          backgroundColor: '#66000000',
        }}
      />
    );
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
      {props.modalPopup.isModalVisible == true ? (
        <PolicyInfoModal navigation={props.navigation} />
      ) : null}
      {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>QUOTE</Text>
          </View>
        </View>
        <View style={styles.contentcontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.subheaderstyle}>Primary Member</Text>
          </View>
        </View>

        <View style={styles.policies}>
          <FlatList
            style={{flex: 1}}
            data={policy}
            keyExtractor={item => item.ID.toString()}
            renderItem={({item, index}) => renderItems(item, index)}
          />
        </View>

        <View
          style={{
            flex: 0.38,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          {props.userinfo.userData.length > 0 &&
          (primarycare.current == true || hospitalcare.current == true) ? (
            <Text style={styles.header}>R{discountedPolicyAmount} p/m</Text>
          ) : null}
          {props.userinfo.userData.length > 0 &&
          primarycare.current == true &&
          hospitalcare.current == true ? (
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  padding: 5,
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                *Discounted
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.clientdatastyle}>
          {props.userinfo.userData != '' ? (
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.subheaderstyle}> Dependants</Text>
            </View>
          ) : null}
          {isDependantDataLoaded == true ? (
            <FlatList
              data={dependantData.length >= 0 ? dependantData : null}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderDependants(item)}
              ItemSeparatorComponent={renderSeparator}
            />
          ) : null}
        </View>
        {primarycare.current == true || hospitalcare.current == true ? (
          <Text style={styles.header}>R{policyamount} p/m</Text>
        ) : null}

        <View style={styles.buttoncontainer}>
          <View style={styles.loginbuttoncontainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.loginbutton}
              onPress={() => getPackageInfo()}>
              <Text style={styles.loginTextColor}>PLAN INFORMATION</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.custombuttoncontainer}>
            <CustomButton
              text="START APPLICATION"
              onPressEvent={() => startApplication()}
            />
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
  header: {
    padding: 5,
    textAlign: 'center',
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
  },
  headercontainer: {
    flex: 0.18,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  contentcontainer: {
    flex: 0.2,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  policies: {
    flex: 0.61,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  clientdatastyle: {
    flex: 0.8,
    backgroundColor: '#66000000',
  },
  itemstyle: {
    flex: 1,
    paddingLeft: 18,
    flexDirection: 'row',
  },
  itemcontainer: {
    flex: 0.5,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  checkboxcontainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  deleteImage: {
    width: '100%',
    height: 28,
    resizeMode: 'contain',
    padding: 10,
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
  rowcontainerstyle: {
    flex: 1,
    flexDirection: 'row',
  },
  rowstyle: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  contentheaderstyle: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  infobuttonstyle: {
    flex: 0.2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttoncontainerstyle: {
    flex: 0.5,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  buttoncontainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: 5,
  },
  removebutton: {
    flex: 0.8,
    justifyContent: 'flex-end',
  },

  loginbuttoncontainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  loginbutton: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#5a95b8',
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    // shadowColor: '#000000',
    elevation: 10,
    position: 'relative',
    // shadowOffset: {width: 0, height: 5},
    // shadowRadius: 5,
    // shadowOpacity: 0.35,
    backgroundColor: '#F9F7F7',
  },
  loginTextColor: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a95b8',
  },
  custombuttoncontainer: {
    flex: 0.55,
    marginTop: 5,
    justifyContent: 'center',
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
    get_UP_ID: UP_ID => {
      dispatch({
        type: GET_UPID,
        payload: {
          UP_ID,
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
export default connectComponent(MonthlySummaryScreenn);
