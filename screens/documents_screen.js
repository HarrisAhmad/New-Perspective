import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {SHOWHIDE_SNACKBAR} from '../store/actiontypes';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import theme from '../common/theme';
import CommonStyles from '../common/commonstyles';
import LoadingIndicator from '../components/loadingindicator_component';
import BackPressHandler from '../components/backpresshandler';
import {GetDependants, SendDocs} from '../services/apiservice';
import {CheckInternetConnectivity} from '../common/commonfunctions';
// import CustomSnackBar from '../components/customsnackbar';
import {
  SaveAsyncStorage,
  GetAsyncStorageData,
} from '../common/commonstoragefunc';

const DocumentScreen = props => {
  const [isChildAdult, setChildAdult] = useState(0);
  const [isCouple, setisCouple] = useState(0);
  const [IDAttached, setIDAttached] = useState(false);
  const [POAAttached, setPoaAttached] = useState(false);
  const [DIDAttached, setDIDAttached] = useState(false);
  const [AdultChid, setAdultChilds] = useState(false);
  const [MarriageCert, setMarriageCert] = useState(false);
  const [BankStatement, setBankStatement] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const UP_ID = useRef('');
  const setIDDocsUri = useRef('');
  const isPOAAttached = useRef(false);
  const isIDAttached = useRef(false);
  const setDIDDocsUri = useRef('');
  const isDIDAttached = useRef(false);
  const setAdultChild = useRef('');
  const isACAttached = useRef(false);
  const setMarriageCertificate = useRef('');
  const isMCAttached = useRef(false);
  const setBankDocs = useRef('');
  const isBankDocsAttached = useRef(false);
  const dependantData = useRef(null);
  const policyNumber = useRef(null);

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getUID();
    getdocSavedStatus();
    checkDocumentStatus();
  }, [isChildAdult, isCouple]);

  const backHandler = () => {
    // alert('Hello');
  };

  const getUID = async () => {
    await AsyncStorage.getItem('UP_ID').then(id => {
      UP_ID.current = id;
      CheckInternetConnectivity().then(connection => {
        if (connection == true) {
          data = {
            UP_ID_FK: UP_ID.current,
            isDependantAdded: 1,
          };

          GetDependants(data).then(response => {
            //console.log(response);
            if (response.length > 0) {
              dependantData.current = response;
              analyzeDependantData();
            }
          });
        } else {
          props.isSnackBarShown(true);
        }
      });
    });
    policyNumber.current = await GetAsyncStorageData('UserPolicy_Number');
  };

  const getdocSavedStatus = async () => {
    const getIDStatus = await GetAsyncStorageData('isIDUploaded');
    const getPOA = await GetAsyncStorageData('isPOAAdded');
    const getDID = await GetAsyncStorageData('DID');
    const getAC = await GetAsyncStorageData('AC');
    const getMC = await GetAsyncStorageData('MC');
    const getBC = await GetAsyncStorageData('BC');
    if (getIDStatus != null) {
      isIDAttached.current = true;
      setIDAttached(true);
    }
    if (getPOA != null) {
      isPOAAttached.current = true;
      setPoaAttached(true);
    }
    if (getDID != null) {
      isDIDAttached.current = true;
      setDIDAttached(true);
    }
    if (getAC != null) {
      isACAttached.current = true;
      setAdultChilds(true);
    }
    if (getMC != null) {
      isMCAttached.current = true;
      setMarriageCert(true);
    }
    if (getBC != null) {
      isBankDocsAttached.current = true;
      setBankStatement(true);
    }
  };

  const analyzeDependantData = () => {
    dependantData.current.map(data => {
      const d_Age = parseInt(data.D_Age, 10);
      if (d_Age >= 21 && data.R_ID_FK == 2) {
        setChildAdult(1);
      }
      if (data.R_ID_FK == 1) {
        setisCouple(1);
      }
    });
  };

  const chooseDocumentFile = async type => {
    CheckInternetConnectivity().then(async connection => {
      if (connection == true) {
        setisLoading(true);
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          });

          if (type === 'ID') {
            // ID Docs
            setIDDocsUri.current = res[0].uri;
            if (setIDDocsUri.current != null) {
              isIDAttached.current = true;
              const fileData = {
                name: 'NP_' + policyNumber.current + '_ID',
                uri: setIDDocsUri.current,
                type: res[0].type,
              };
              await SendDocs(fileData); // API call for sending docs to server

              await SaveAsyncStorage('isDocsFileAdded', 1);
              setIDAttached(true);
              setisLoading(false);
              checkDocumentStatus();
            }
          } else if (type === 'POA') {
            // Proof Of Address Docs
            const uri = res[0].uri;
            if (uri != null) {
              isPOAAttached.current = true;
              const fileData = {
                name: 'NP_' + policyNumber.current + '_POA',
                uri: uri,
                type: res[0].type,
              };
              console.log('POA' + isPOAAttached.current);
              await SendDocs(fileData); // API call for sending docs to server
              await SaveAsyncStorage('isPOAAdded', 1);
              setPoaAttached(true);
              setisLoading(false);
              checkDocumentStatus();
            }
          } else if (type === 'DID') {
            //Dependnat ID
            setDIDDocsUri.current = res[0].uri;
            if (setDIDDocsUri.current != null) {
              isDIDAttached.current = true;
              const fileData = {
                name: 'NP_' + policyNumber.current + '_DID',
                uri: setDIDDocsUri.current,
                type: res[0].type,
              };
              await SendDocs(fileData);
              // console.log('DID' + isDIDAttached.current);
              await SaveAsyncStorage('DID', 1);
              setDIDAttached(true);
              setisLoading(false);
              checkDocumentStatus();
            }
          } else if (type === 'AC') {
            // Adult Child
            setAdultChild.current = res[0].uri;
            if (setAdultChild.current != null) {
              isACAttached.current = true;
              const fileData = {
                name: 'NP_' + policyNumber.current + '_AD',
                uri: setAdultChild.current,
                type: res[0].type,
              };
              await SendDocs(fileData);
              // console.log('AC' + isACAttached.current);
              await SaveAsyncStorage('AC', 1);
              setAdultChilds(true);
              setisLoading(false);
              checkDocumentStatus();
            }
          } else if (type === 'MC') {
            setMarriageCertificate.current = res[0].uri;
            if (setMarriageCertificate.current != null) {
              isMCAttached.current = true;
              const fileData = {
                name: 'NP_' + policyNumber.current + '_MC',
                uri: setMarriageCertificate.current,
                type: res[0].type,
              };
              await SendDocs(fileData);
              // console.log('MC' + isMCAttached.current);
              await SaveAsyncStorage('MC', 1);
              setMarriageCert(true);
              setisLoading(false);
              checkDocumentStatus();
            }
          } else if (type === 'BC') {
            setBankDocs.current = res[0].uri;
            if (setBankDocs.current != null) {
              isBankDocsAttached.current = true;
              const fileData = {
                name: 'NP_' + policyNumber.current + '_BS',
                uri: setBankDocs.current,
                type: res[0].type,
              };
              await SendDocs(fileData);
              // console.log('BC' + isBankDocsAttached.current);
              await SaveAsyncStorage('BC', 1);
              setBankStatement(true);
              setisLoading(false);
              checkDocumentStatus();
            }
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
            setisLoading(false);
          } else {
            throw err;
          }
        }
      } else {
        props.isSnackBarShown(true);
      }
    });
  };

  const checkDocumentStatus = async () => {
    // When There are no dependants
    if (isCouple == 0 && isChildAdult == 0 && dependantData.current == null) {
      if (
        isIDAttached.current &&
        isBankDocsAttached.current &&
        isPOAAttached.current
      ) {
        await SaveAsyncStorage('isDocsFileAdded', 1);
        props.navigation.dispatch(
          StackActions.replace('Application Processed'),
        );
      }
    }

    // When There are dependants but no adult and spouse
    if (isCouple == 0 && isChildAdult == 0 && dependantData.current != null) {
      if (
        isIDAttached.current &&
        isPOAAttached.current &&
        isBankDocsAttached.current &&
        isDIDAttached.current
      ) {
        await SaveAsyncStorage('isDocsFileAdded', 1);
        props.navigation.dispatch(
          StackActions.replace('Application Processed'),
        );
        // props.navigation.navigate('Application Processed');
      }
    }
    // When have Spouse dependant
    if (isCouple == 1 && isChildAdult == 0 && dependantData.current != null) {
      if (
        isIDAttached.current &&
        isPOAAttached.current &&
        isDIDAttached.current &&
        isBankDocsAttached.current &&
        isMCAttached.current
      ) {
        await SaveAsyncStorage('isDocsFileAdded', 1);
        props.navigation.navigate('Application Processed');
      }
    }
    // When having Spouse and Adult Child Dependant
    if (isCouple == 1 && isChildAdult == 1 && dependantData.current != null) {
      if (
        isIDAttached.current &&
        isPOAAttached.current &&
        isDIDAttached.current &&
        isBankDocsAttached.current &&
        isMCAttached.current &&
        isACAttached.current
      ) {
        await SaveAsyncStorage('isDocsFileAdded', 1);
        props.navigation.dispatch(
          StackActions.replace('Application Processed'),
        );
        // props.navigation.navigate('Application Processed');
      }
    }
    // When having Adult child dependant only
    if (isCouple == 0 && isChildAdult == 1 && dependantData.current != null) {
      if (
        isIDAttached.current &&
        isPOAAttached.current &&
        isDIDAttached.current &&
        isBankDocsAttached.current &&
        isACAttached.current
      ) {
        await SaveAsyncStorage('isDocsFileAdded', 1);
        props.navigation.dispatch(
          StackActions.replace('Application Processed'),
        );
      }
    }
  };

  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={require('../assets/images/greenbgs.png')}>
      {/* {props.modalPopup.isSnackbarShown == true ? <CustomSnackBar /> : null} */}
      {isLoading == true ? <LoadingIndicator /> : null}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={styles.headerStyle}>UPLOAD</Text>
          </View>
        </View>
        <View style={CommonStyles.subheaderstyle}>
          <Text style={CommonStyles.subheaderleft}>
            Please upload the required documents.
          </Text>
        </View>

        <ScrollView style={styles.regform}>
          <View style={styles.rowcontainerstyle}>
            <View style={styles.policydetailcontainer}>
              <View style={styles.rowstyle}>
                <Text style={CommonStyles.subheaderleft}>
                  Attach clear copies of your identity documents
                </Text>
              </View>
            </View>
            <View style={styles.checkboxcontainer}>
              {IDAttached == false ? (
                <TouchableOpacity onPress={() => chooseDocumentFile('ID')}>
                  <Image
                    source={require('../assets/images/uploaddocs.png')}
                    style={styles.docsImage}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <Image
                    source={require('../assets/images/docuploaded.png')}
                    style={styles.docsImageUploaded}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.rowcontainerstyle}>
            <View style={styles.policydetailcontainer}>
              <View style={styles.rowstyle}>
                <Text style={CommonStyles.subheaderleft}>
                  Attach clear copies of your proof of address{'\n'}(Not older
                  than three months)
                </Text>
              </View>
            </View>
            <View style={styles.checkboxcontainer}>
              {POAAttached == false ? (
                <TouchableOpacity onPress={() => chooseDocumentFile('POA')}>
                  <Image
                    source={require('../assets/images/uploaddocs.png')}
                    style={styles.docsImage}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <Image
                    source={require('../assets/images/docuploaded.png')}
                    style={styles.docsImageUploaded}
                  />
                </View>
              )}
            </View>
          </View>
          {dependantData.current != null ? (
            <>
              <View style={styles.rowcontainerstyle}>
                <View style={styles.policydetailcontainer}>
                  <View style={styles.rowstyle}>
                    <Text style={CommonStyles.subheaderleft}>
                      Attach clear copies of All Dependant identity documents
                    </Text>
                  </View>
                </View>
                <View style={styles.checkboxcontainer}>
                  {DIDAttached == false ? (
                    <TouchableOpacity onPress={() => chooseDocumentFile('DID')}>
                      <Image
                        source={require('../assets/images/uploaddocs.png')}
                        style={styles.docsImage}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <Image
                        source={require('../assets/images/docuploaded.png')}
                        style={styles.docsImageUploaded}
                      />
                    </View>
                  )}
                </View>
              </View>
            </>
          ) : null}
          {isChildAdult == 1 ? (
            <>
              <View style={styles.rowcontainerstyle}>
                <View style={styles.policydetailcontainer}>
                  <View style={styles.rowstyle}>
                    <Text style={CommonStyles.subheaderleft}>
                      Child dependant aged 21 or older at an adult dependant
                      premium if your dependant is financially dependant on you
                      and proof is submitted every year. We accept proof of
                      full-time studies from an educational facility or 3
                      months’ stamped copies of your dependant’s most recent
                      bank statements
                    </Text>
                  </View>
                </View>
                <View style={styles.checkboxcontainer}>
                  {AdultChid == false ? (
                    <TouchableOpacity onPress={() => chooseDocumentFile('AC')}>
                      <Image
                        source={require('../assets/images/uploaddocs.png')}
                        style={styles.docsImage}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <Image
                        source={require('../assets/images/docuploaded.png')}
                        style={styles.docsImageUploaded}
                      />
                    </View>
                  )}
                </View>
              </View>
            </>
          ) : null}
          {isCouple == 1 ? (
            <>
              <View style={styles.rowcontainerstyle}>
                <View style={styles.policydetailcontainer}>
                  <View style={styles.rowstyle}>
                    <Text style={CommonStyles.subheaderleft}>
                      Attach copy of the marriage certificate for a spouse
                      dependant. Where applicable a physician report must be
                      included to confirm disability of handicapped dependants.
                    </Text>
                  </View>
                </View>
                <View style={styles.checkboxcontainer}>
                  {MarriageCert == false ? (
                    <TouchableOpacity onPress={() => chooseDocumentFile('MC')}>
                      <Image
                        source={require('../assets/images/uploaddocs.png')}
                        style={styles.docsImage}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <Image
                        source={require('../assets/images/docuploaded.png')}
                        style={styles.docsImageUploaded}
                      />
                    </View>
                  )}
                </View>
              </View>
            </>
          ) : null}

          <View style={styles.rowcontainerstyle}>
            <View style={styles.policydetailcontainer}>
              <View style={styles.rowstyle}>
                <Text style={CommonStyles.subheaderleft}>
                  Attach copies of your latest bank statement or proof of
                  account details from your bank.
                </Text>
              </View>
            </View>
            <View style={styles.checkboxcontainer}>
              {BankStatement == false ? (
                <TouchableOpacity onPress={() => chooseDocumentFile('BC')}>
                  <Image
                    source={require('../assets/images/uploaddocs.png')}
                    style={styles.docsImage}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <Image
                    source={require('../assets/images/docuploaded.png')}
                    style={styles.docsImageUploaded}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
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
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  headerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    fontSize: 26,
    color: theme.textcolor,
    fontWeight: 'bold',
  },
  docsImage: {width: 35, height: 31, padding: 3, bottom: 0, left: 1, top: 10},
  docsImageUploaded: {
    width: 30,
    height: 22,
    padding: 1,
    bottom: 0,
    left: 0,
    top: 10,
  },
  regform: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    padding: 2,
    alignSelf: 'stretch',
  },
  rowcontainerstyle: {
    flex: 0.5,
    flexDirection: 'row',
  },
  policydetailcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowstyle: {
    flex: 1,
    padding: 2,
    flexDirection: 'column',
  },
  checkboxcontainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, modalPopup: state.modalPopup};
};
const mapDispatchToProps = dispatch => {
  return {
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
export default connectComponent(DocumentScreen);
