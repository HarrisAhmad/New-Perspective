import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {CheckBox} from 'react-native-elements';

import {InsertUserPolicy, InsertUserDependants} from '../services/apiservice';
import {
  SaveAsyncStorage,
  GetAsyncStorageData,
} from '../common/commonstoragefunc';
import CustomButton from '../components/custombutton';
import PolicyInfoModal from '../components/poliicyinfomodal';
import CommonStyles from '../common/commonstyles';
import {
  GetUserDate,
  GetPolicyBenifitDate,
  CalculateAge,
} from '../common/commonfunctions';
import AdditionalInfoModal from '../components/additionalinfomodal';
import {
  SHOW_INFOMODAL,
  GETUSER_DATA,
  GET_UPID,
  SHOWHIDE_SNACKBAR,
  SHOW_ADDITIONALINFO_MODAL,
} from '../store/actiontypes';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import theme from '../common/theme';
import LoadingIndicator from '../components/loadingindicator_component';
import InfoButton from '../components/infobutton_component';

const SummaryScreen = props => {
  const [selectedPolicy, setSelectedPolicy] = useState([]);
  const [dependantData, setDependantData] = useState(props.userinfo.userData);
  const [isDependantDataLoaded, setDependantDataLoaded] = useState(false);
  const [policy, setPolicy] = useState([
    {
      ID: 1,
      policy: 'Primary Care',
      checked: true,
      amount: props.userinfo.primararyMemberAge > 56 ? 530 : 349,
    },
    {
      ID: 2,
      policy: 'Hospital Care',
      checked: true,
      amount: props.userinfo.primararyMemberAge > 56 ? 220 : 175,
    },
  ]);
  const [policyamount, setPolicyAmount] = useState(0);
  const [discountedPolicyAmount, setDiscountedPolicyAmount] = useState(524);
  const [dependantTotalAmount, setDependantsTotalAmount] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const didMountRef = useRef(false);
  const primarycare = useRef(true);
  const hospitalcare = useRef(true);
  const isChecked = useRef(true);
  const policyPaidAmount = useRef(0);
  const dependantPaidAmount = useRef(0);
  const UP_ID = useRef(null);
  const PI_ID = useRef(null);
  const policyNumber = useRef(null);
  const primararyMemberAge = useRef(0);
  const policyMode = useRef(null);

  useEffect(() => {
    if (didMountRef.current) {
      if (props.userinfo.userData != null || props.userinfo.userData != '') {
        PrimaryMemberAge();
        calculatePolicyAmount();
        getUP_ID();
      }
    } else {
      didMountRef.current = true;
      if (props.userinfo.userData != null || props.userinfo.userData != '') {
        PrimaryMemberAge();
        calculatePolicyAmount();
        getUP_ID();
      }
    }
  }, [isDependantDataLoaded, dependantData]);

  const getUP_ID = async () => {
    try {
      UP_ID.current = await GetAsyncStorageData('UP_ID');
      PI_ID.current = await GetAsyncStorageData('PI_ID');
      policyNumber.current = await GetAsyncStorageData('UserPolicy_Number');
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  const PrimaryMemberAge = () => {
    primararyMemberAge.current = CalculateAge(props.userinfo.Birth_Year);
    //   console.log(primararyMemberAge.current);
  };

  const startApplication = () => {
    CheckInternetConnectivity().then(connection => {
      if (connection == true) {
        if (primarycare.current == true || hospitalcare.current == true) {
          insertData();
        } else {
          alert('Please select policy First');
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const getChargesPackageInfo = () => {
    props.additionalmodalShown(true);
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
                  <InfoButton
                    onPressEvent={() => getPackageInfo(index)}
                    flexRange={0.6}
                    padding={0.5}
                  />
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
    if (dependant_Array == null || dependant_Array.length == 0) {
      if (
        primarycare.current == true &&
        hospitalcare.current == true &&
        primararyMemberAge.current <= 56
      ) {
        policyPaidAmount.current = 524;
        setPolicyAmount(524);
      } else if (
        primarycare.current == true &&
        hospitalcare.current == true &&
        primararyMemberAge.current > 56
      ) {
        const updatedQuote = policy.map(item => {
          if (item.ID === 2) {
            return {...item, amount: 220};
          }

          return item;
        });
        setPolicy(updatedQuote);
        policyPaidAmount.current = 750;
        setPolicyAmount(750);
      } else if (
        primarycare.current == true &&
        hospitalcare.current == false &&
        primararyMemberAge.current <= 56
      ) {
        setPolicyAmount(349);
        policyPaidAmount.current = 349;
      } else if (
        primarycare.current == true &&
        hospitalcare.current == false &&
        primararyMemberAge.current > 56
      ) {
        setPolicyAmount(530);
        policyPaidAmount.current = 530;
      } else if (
        primarycare.current == false &&
        hospitalcare.current == true &&
        primararyMemberAge.current <= 61
      ) {
        const updatedQuote = policy.map(item => {
          if (item.ID === 2) {
            return {...item, amount: 175};
          }

          return item;
        });
        setPolicy(updatedQuote);
        console.log(updatedQuote);
        setPolicyAmount(175);
        policyPaidAmount.current = 175;
      } else if (
        primarycare.current == false &&
        hospitalcare.current == true &&
        primararyMemberAge.current > 61
      ) {
        setPolicyAmount(220);
        policyPaidAmount.current = 220;
      } else if (
        primarycare.current == false &&
        hospitalcare.current == false
      ) {
        setPolicyAmount(0);
      }
    }

    if (dependant_Array.length > 0) {
      let dependantTotal = 0;
      if (
        primarycare.current == true &&
        hospitalcare.current == true &&
        primararyMemberAge.current <= 56
      ) {
        policyPaidAmount.current = 524;
        setPolicyAmount(524);
        setDiscountedPolicyAmount(524);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            dependantPaidAmount.current = 376;
            setPolicyAmount(policyamount => policyamount + 281 + 95);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 376};
            dependantTotal = dependantTotal + 376;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            dependantPaidAmount.current = 143;
            setPolicyAmount(policyamount => policyamount + 107 + 39);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 146};
            dependantTotal = dependantTotal + 146;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age >= 56) {
            dependantPaidAmount.current = 602;
            setPolicyAmount(policyamount => policyamount + 281 + 181 + 95 + 45);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 602};
            dependantTotal = dependantTotal + 602;
            setDependantData(dependant_Array);
          }
        }
        setDependantsTotalAmount(dependantTotal);
      } else if (
        primarycare.current == true &&
        hospitalcare.current == true &&
        primararyMemberAge.current > 56
      ) {
        policyPaidAmount.current = 750;
        const updatedQuote = policy.map(item => {
          if (item.ID === 2) {
            return {...item, amount: 220};
          }

          return item;
        });
        setPolicy(updatedQuote);
        setPolicyAmount(750);
        setDiscountedPolicyAmount(750);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            dependantPaidAmount.current = 376;
            setPolicyAmount(policyamount => policyamount + 281 + 95);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 376};
            dependantTotal = dependantTotal + 376;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            dependantPaidAmount.current = 143;
            setPolicyAmount(policyamount => policyamount + 107 + 39);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 146};
            dependantTotal = dependantTotal + 146;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age >= 56) {
            dependantPaidAmount.current = 602;
            setPolicyAmount(policyamount => policyamount + 281 + 181 + 95 + 45);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 602};
            dependantTotal = dependantTotal + 602;
            setDependantData(dependant_Array);
          }
        }
        setDependantsTotalAmount(dependantTotal);
      } else if (
        primarycare.current == true &&
        hospitalcare.current == false &&
        primararyMemberAge.current <= 56
      ) {
        policyPaidAmount.current = 349;
        setPolicyAmount(349);
        setDiscountedPolicyAmount(349);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            dependantPaidAmount.current = 281;
            setPolicyAmount(policyamount => policyamount + 281);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 281};
            dependantTotal = dependantTotal + 281;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            dependantPaidAmount.current = 107;
            setPolicyAmount(policyamount => policyamount + 107);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 107};
            dependantTotal = dependantTotal + 107;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age >= 56) {
            dependantPaidAmount.current = 462;
            setPolicyAmount(policyamount => policyamount + 281 + 181);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 462};
            dependantTotal = dependantTotal + 462;
            setDependantData(dependant_Array);
          }
        }
        setDependantsTotalAmount(dependantTotal);
      } else if (
        primarycare.current == true &&
        hospitalcare.current == false &&
        primararyMemberAge.current > 56
      ) {
        policyPaidAmount.current = 530;
        setPolicyAmount(530);
        setDiscountedPolicyAmount(530);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 56) {
            dependantPaidAmount.current = 281;
            setPolicyAmount(policyamount => policyamount + 281);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 281};
            dependantTotal = dependantTotal + 281;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            dependantPaidAmount.current = 107;
            setPolicyAmount(policyamount => policyamount + 107);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 107};
            dependantTotal = dependantTotal + 107;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age >= 56) {
            dependantPaidAmount.current = 462;
            setPolicyAmount(policyamount => policyamount + 281 + 181);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 462};
            dependantTotal = dependantTotal + 462;
            setDependantData(dependant_Array);
          }
        }
        setDependantsTotalAmount(dependantTotal);
      } else if (
        primarycare.current == false &&
        hospitalcare.current == true &&
        primararyMemberAge.current < 61
      ) {
        policyPaidAmount.current = 175;
        const updatedQuote = policy.map(item => {
          if (item.ID === 2) {
            return {...item, amount: 175};
          }

          return item;
        });
        setPolicy(updatedQuote);
        setPolicyAmount(175);
        setDiscountedPolicyAmount(175);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age < 61) {
            dependantPaidAmount.current = 95;
            setPolicyAmount(policyamount => policyamount + 95);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 95};
            dependantTotal = dependantTotal + 95;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            dependantPaidAmount.current = 39;
            setPolicyAmount(policyamount => policyamount + 39);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 39};
            dependantTotal = dependantTotal + 39;
            setDependantData(dependant_Array);
          }
          if (dependant_Array[i].age >= 61) {
            dependantPaidAmount.current = 140;
            setPolicyAmount(policyamount => policyamount + 95 + 45);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 140};
            dependantTotal = dependantTotal + 140;
            setDependantData(dependant_Array);
          }
        }
        setDependantsTotalAmount(dependantTotal);
      } else if (
        primarycare.current == false &&
        hospitalcare.current == true &&
        primararyMemberAge.current > 61
      ) {
        policyPaidAmount.current = 220;
        setPolicyAmount(220);
        setDiscountedPolicyAmount(220);
        for (let i = 0; i < dependant_Array.length; i++) {
          if (dependant_Array[i].age > 20 && dependant_Array[i].age <= 61) {
            dependantPaidAmount.current = 95;
            setPolicyAmount(policyamount => policyamount + 95);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 95};
            dependantTotal = dependantTotal + 95;
            setDependantData(dependant_Array);
          }

          if (dependant_Array[i].age < 21) {
            dependantPaidAmount.current = 39;
            setPolicyAmount(policyamount => policyamount + 39);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 39};
            dependantTotal = dependantTotal + 39;
            setDependantData(dependant_Array);
          }
          if (dependant_Array[i].age > 61) {
            dependantPaidAmount.current = 140;
            setPolicyAmount(policyamount => policyamount + 95 + 45);
            dependant_Array[i] = {...dependant_Array[i], dependant_Amount: 140};
            dependantTotal = dependantTotal + 140;
            setDependantData(dependant_Array);
          }
        }
        setDependantsTotalAmount(dependantTotal);
      } else if (
        primarycare.current == false &&
        hospitalcare.current == false
      ) {
        setPolicyAmount(0);
        setDiscountedPolicyAmount(0);
        setDependantsTotalAmount(0);
      }
      setDependantDataLoaded(true);
    }
    setisLoading(false);
  };

  const getPackageInfo = index => {
    policyMode.current = index;
    props.modalShown(true);
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
      UP_ID: UP_ID.current == null ? 0 : UP_ID.current,
      P_ID_FK: policyID,
      DOB: GetUserDate(props.userinfo.Birth_Year),
      PolicyAmount: policyPaidAmount.current,
      DependantAmount: dependantPaidAmount.current,
      Amount: policyamount.toString(),
      HavingDependant: props.userinfo.userData == '' ? 0 : 1,
      BenifitDate: benefitDate,
      UserPolicyNumber: policyNumber.current == null ? 0 : policyNumber.current,
    };

    if (props.userinfo.userData == '' || props.userinfo.userData == null) {
      InsertUserPolicy(data).then(async response => {
        const UserP_ID = response.UserPolicy_ID;
        await SaveAsyncStorage('UP_ID', UserP_ID.toString());
        await SaveAsyncStorage(
          'UserPolicy_Number',
          response.PolicyNumber.toString(),
        );
        props.get_UP_ID(UserP_ID);
        setisLoading(false);
        PI_ID.current == null
          ? props.navigation.navigate('Signup')
          : props.navigation.navigate('Proflie Screen');
      });
    } else {
      let dependantArray = [];
      InsertUserPolicy(data).then(async response => {
        const UserP_ID = response.UserPolicy_ID;
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
        InsertUserDependants(dependantArray).then(() => {
          setisLoading(false);
          PI_ID.current == null
            ? props.navigation.navigate('Signup')
            : props.navigation.navigate('Proflie Screen');
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
    setDependantData(data);
    props.get_UserData(data);
  };

  const renderSeparator = () => {
    return <View style={styles.sepratorStyle} />;
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/purplebgs.png')}>
      {props.modalPopup.isAdditionalInfoVisible == true ? (
        <AdditionalInfoModal mode={4} />
      ) : null}

      {props.modalPopup.isModalVisible == true ? (
        <PolicyInfoModal
          navigation={props.navigation}
          policyMode={policyMode.current}
        />
      ) : null}
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoading == true ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.headercontainer}>
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.header}>QUOTE</Text>
            </View>
            <InfoButton
              onPressEvent={() => getChargesPackageInfo()}
              flexRange={0.29}
            />
          </View>
          <View style={styles.contentcontainer}>
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.subheaderstyle}>Primary Member</Text>
            </View>
            <View style={styles.policyAmountStyle}>
              {props.userinfo.userData.length > 0 &&
              (primarycare.current == true || hospitalcare.current == true) ? (
                <Text style={CommonStyles.subheaderstyle}>
                  R{discountedPolicyAmount} p/m
                </Text>
              ) : null}
            </View>
            {/* <Text style={CommonStyles.vatTextStyle}>VAT incl.</Text> */}
          </View>

          <View style={styles.policies}>
            <FlatList
              style={{flex: 1}}
              data={policy}
              keyExtractor={item => item.ID.toString()}
              renderItem={({item, index}) => renderItems(item, index)}
            />
          </View>

          <View style={styles.contentcontainer}>
            {props.userinfo.userData != '' ? (
              <>
                <View style={CommonStyles.subheaderleft}>
                  <Text style={CommonStyles.subheaderstyle}> Dependants</Text>
                </View>
                <View style={styles.policyAmountStyle}>
                  {props.userinfo.userData.length > 0 &&
                  (primarycare.current == true ||
                    hospitalcare.current == true) ? (
                    <Text style={CommonStyles.subheaderstyle}>
                      R{dependantTotalAmount} p/m
                    </Text>
                  ) : null}
                </View>
              </>
            ) : null}
          </View>

          {isDependantDataLoaded == true ? (
            <FlatList
              data={dependantData.length >= 0 ? dependantData : null}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderDependants(item)}
              ItemSeparatorComponent={renderSeparator}
            />
          ) : null}

          {primarycare.current == true || hospitalcare.current == true ? (
            <View style={styles.totalContainer}>
              <Text style={styles.header}>R{policyamount} p/m</Text>
              <Text style={CommonStyles.vatTextStyle}>VAT incl.</Text>
            </View>
          ) : null}

          <View style={styles.buttoncontainer}>
            {/* <View style={styles.loginbuttoncontainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.loginbutton}
                onPress={() => getPackageInfo()}>
                <Text style={styles.loginTextColor}>PLAN INFORMATION</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.custombuttoncontainer}>
              <CustomButton
                text="PROCEED"
                onPressEvent={() => startApplication()}
              />
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sepratorStyle: {
    padding: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#66000000',
  },
  header: {
    textAlign: 'center',
    fontSize: 45,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.font,
  },
  subHeaderQuote: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.font,
  },
  headercontainer: {
    flex: Platform.OS == 'android' ? 0.3 : 0.28,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  contentcontainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  totalContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  policies: {
    flex: 0.67,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  policyAmountStyle: {
    flex: 0.59,
    paddingTop: 5,
    flexDirection: 'row',
    alignContent: 'flex-start',
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
  buttoncontainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
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
    elevation: 10,
    position: 'relative',
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
    modalShown: isModalVisible => {
      dispatch({
        type: SHOW_INFOMODAL,
        payload: {
          isModalVisible,
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
export default connectComponent(SummaryScreen);
