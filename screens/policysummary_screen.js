import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import {AdjustPolicyDate, GetPolicyDetails} from '../services/apiservice';
import TermsModal from '../components/termsmodal';
import AdjustDateModal from '../components/adjustdate_component';
import CustomButton from '../components/custombutton';
import {GetAsyncStorageData} from '../common/commonstoragefunc';
import CommonStyles from '../common/commonstyles';
import {GetUserDate} from '../common/commonfunctions';
import {
  SHOW_SIGNATUREMODAL,
  SHOWHIDE_SNACKBAR,
  GET_ADJUSTED_DATE,
} from '../store/actiontypes';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import theme from '../common/theme';
import {Platform} from 'react-native';
import LoadingIndicator from '../components/loadingindicator_component';

const PolicySummaryScreen = props => {
  const [dependantData, setDependantData] = useState([]);
  const [isDependantDataLoaded, setDependantDataLoaded] = useState(false);
  const [policyPlan, setPolicyPlan] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const UP_ID = useRef('');
  const policyTotalAmount = useRef(null);
  const policyPremium = useRef(null);
  const policyStartDate = useRef(null);

  useEffect(() => {
    setisLoading(true);
    getUID();
  }, []);

  const getUID = async () => {
    UP_ID.current = await GetAsyncStorageData('UP_ID');
    getDetails();
  };

  const getDetails = () => {
    const data = {
      UP_ID: UP_ID.current,
    };

    GetPolicyDetails(data).then(response => {
      policyTotalAmount.current = response[0].UP_PolicyAmount;
      policyPremium.current = response[0].UP_TotalAmount;
      policyStartDate.current = response[0].UP_StartDate;
      if (response[0].P_Name == 'Combined') {
        setPolicyPlan('Primary Care & Hospital Care');
      } else {
        setPolicyPlan(response[0].P_Name);
      }
      if (response[0].R_Name != null) {
        let dependant_Array = [];
        for (let i = 0; i < response.length; i++) {
          let dependantDataObj = {
            id: i + 1,
            relation: response[i].R_Name,
            dependantAmount: response[i].UP_DependantAmount,
          };
          dependant_Array.push(dependantDataObj);
        }

        setDependantData(dependant_Array);
        setDependantDataLoaded(true);
        setisLoading(false);
      } else {
        setDependantDataLoaded(false);
        setisLoading(false);
      }
    });
  };

  const currentDate = () => {
    if (props.userinfo.Adjusted_Date == '') {
      return GetUserDate(policyStartDate.current);
    } else {
      return GetUserDate(props.userinfo.Adjusted_Date);
    }
  };

  const updatePolicyDate = async () => {
    setisLoading(true);
    const newDate = GetUserDate(props.userinfo.Adjusted_Date);

    const data = {
      UP_ID: 26,
      StartDate: newDate,
    };
    props.adjust_ComencementDate(newDate);

    AdjustPolicyDate(data).then(response => {
      getDetails();
    });
  };

  const renderDependants = item => {
    return (
      <>
        <View style={styles.itemstyle}>
          <Text style={CommonStyles.textstyle}> {item.relation}</Text>

          <Text style={CommonStyles.textstyle}>{item.dependantAmount} p/m</Text>
        </View>
      </>
    );
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          padding: 5,
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
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoading == true ? <LoadingIndicator /> : null}
      {isLoading == false ? (
        <View style={styles.container}>
          <View style={styles.headercontainer}>
            <View style={CommonStyles.subheaderleft}>
              <Text style={CommonStyles.header}>POLICY SUMMARY</Text>
            </View>
          </View>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}>
            <View style={styles.contentcontainer}>
              <View style={CommonStyles.subheaderleft}>
                <Text style={CommonStyles.subheaderstyle}>SELECTED POLICY</Text>
              </View>
              <View style={styles.policies}>
                <Text style={CommonStyles.paraLeft}>{policyPlan}</Text>
                <Text style={[CommonStyles.header]}>
                  R{policyTotalAmount.current}
                </Text>
              </View>
            </View>

            {isDependantDataLoaded ? (
              <View style={styles.clientdatastyle}>
                <View style={CommonStyles.subheaderleft}>
                  <Text style={CommonStyles.subheaderstyle}> DEPENDANTS</Text>
                </View>

                {dependantData.length >= 1 ? (
                  <FlatList
                    data={dependantData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderDependants(item)}
                    ItemSeparatorComponent={renderSeparator}
                  />
                ) : null}
              </View>
            ) : null}
            <View style={styles.dateAdjusterStyle}>
              <AdjustDateModal
                getCurrentDate={() => currentDate()}
                //   skip={() => shiftModal()}
                updateDate={() => updatePolicyDate()}
                premium={policyPremium.current}
              />
            </View>
          </ScrollView>
        </View>
      ) : null}
      {isLoading == false ? (
        <View style={styles.buttoncontainer}>
          <View style={styles.custombuttoncontainer}>
            <CustomButton
              text="CONFIRM"
              onPressEvent={() => props.signaturemodalShown(true)}
            />
          </View>
        </View>
      ) : null}
      {props.modalPopup.isSignatureModalVisible == true ? (
        <TermsModal state={0} navigation={props.navigation} />
      ) : null}
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
    fontFamily: theme.font,
  },
  headercontainer: {
    flex: Platform.OS == 'android' ? 0.1 : 0.12,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  contentcontainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  policies: {
    flex: 0.41,
    paddingStart: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  clientdatastyle: {
    flex: 0.65,
    backgroundColor: '#66000000',
  },
  itemstyle: {
    flex: 0.5,
    paddingLeft: 18,
    flexDirection: 'row',
  },
  dateAdjusterStyle: {
    flex: 1,
  },
  buttoncontainer: {
    flex: 0.15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: 5,
    bottom: 8,
  },
  custombuttoncontainer: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
    signaturemodalShown: isSignatureModalVisible => {
      dispatch({
        type: SHOW_SIGNATUREMODAL,
        payload: {
          isSignatureModalVisible,
        },
      });
    },
    adjust_ComencementDate: Adjusted_Date => {
      dispatch({
        type: GET_ADJUSTED_DATE,
        payload: {
          Adjusted_Date,
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
export default connectComponent(PolicySummaryScreen);
