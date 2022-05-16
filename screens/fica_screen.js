import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Platform,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Fica} from '../common/textcontent';
import CustomButton from '../components/custombutton';
import BackPressHandler from '../components/backpresshandler';
import {TextInput, Switch} from 'react-native-paper';
import {ButtonGroup} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

import theme from '../common/theme';
import CustomDropdown from '../components/modaldropdown';
import CommonStyles from '../common/commonstyles';
import CongratsModal from '../components/congrats_modal';
import {
  GetFicaRelations,
  InsertProminentRelation,
} from '../services/apiservice';
import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOW_INFOMODAL,
} from '../store/actiontypes';
import {ScrollView} from 'react-native-gesture-handler';

const FicaScreen = props => {
  const [PI_ID, setPI_ID] = useState(0);
  const [name, setName] = useState('');
  const [FicaIndex, setIndex] = useState(0);
  const [isDPIP, setDPIP] = useState(0);
  const [isFPPO, setFPPO] = useState(0);
  const [relationship, addRelations] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const buttons = [
    {element: () => <Text style={CommonStyles.textstyle}>No</Text>},
    {element: () => <Text style={CommonStyles.textstyle}>Yes</Text>},
  ];

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackPressHandler(backHandler);
    }
    getPI_ID();
  }, [PI_ID]);

  const backHandler = () => {
    // alert('Hello');
  };

  const getPI_ID = async () => {
    try {
      await AsyncStorage.getItem('PI_ID').then(id => {
        setPI_ID(id);

        data = {
          PI_ID: id,
        };
        GetFicaRelations(data).then(relations => {
          addRelations(relations);
        });
      });
    } catch (e) {
      alert('Failed to save ');
    }
  };

  const validate = () => {
    if (name == '') {
      return 'Enter Name';
    }
    if (
      props.userinfo.relationshipID == 0 ||
      props.userinfo.relationshipID == undefined
    ) {
      return 'Select your Relation';
    }

    return 'true';
  };

  const saveisFicaAdded = async isAdded => {
    try {
      await AsyncStorage.setItem('isFicaAdded', isAdded.toString());
    } catch (e) {
      console.log('Error' + e);
      alert('Failed to save the data');
    }
  };

  const saveInfo = () => {
    if (FicaIndex == 0) {
      setisLoading(true);
      const data = {
        PR_GeneralQ: FicaIndex,
        PI_ID_FK: PI_ID,
        PR_Name: 'N/A',
        isDomesticProminet: FicaIndex == 0 ? 0 : isDPIP == false ? 0 : 1,
        isForeignProminent: FicaIndex == 0 ? 0 : isFPPO == false ? 0 : 1,
        isClient: 0,
        isAssociate: 0,
        isFamily: 0,
      };
      InsertProminentRelation(data).then(response => {
        setisLoading(false);
        props.navigation.dispatch(
          StackActions.replace('Beneficiary Nomination'),
        );
        saveisFicaAdded(1);
      });
    } else {
      if (validate() == 'true') {
        setisLoading(true);
        const data = {
          PR_GeneralQ: FicaIndex,
          PI_ID_FK: PI_ID,
          PR_Name: name,
          isDomesticProminet: isDPIP,
          isForeignProminent: isFPPO,
          isClient: props.userinfo.relationshipID == 1 ? 1 : 0,
          isAssociate: props.userinfo.relationshipID == 2 ? 1 : 0,
          isFamily: props.userinfo.relationshipID == 3 ? 1 : 0,
        };
        InsertProminentRelation(data).then(response => {
          setisLoading(false);
          props.navigation.dispatch(
            StackActions.replace('Beneficiary Nomination'),
          );
          //   props.navigation.navigate('Beneficiary Nomination');
          saveisFicaAdded(1);
        });
      } else {
        alert(validate());
      }
    }
  };

  const updateIndex = index => {
    setIndex(index);
  };

  const updateDPIP = () => {
    setDPIP(!isDPIP);
  };
  const updateFPPO = () => {
    setFPPO(!isFPPO);
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
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={CommonStyles.subheaderleft}>
            <View style={CommonStyles.headerstyle}>
              <Text style={CommonStyles.header}>FICA QUESTIONNAIRE</Text>
            </View>
          </View>
        </View>

        <View style={styles.infocontainer}>
          <View style={styles.contentcontainer}>
            <View style={CommonStyles.subheaderstyle}>
              <Text style={CommonStyles.subheaderleft}>{Fica()}</Text>
            </View>
          </View>
          <View style={styles.radiogroup}>
            <ButtonGroup
              onPress={updateIndex}
              selectedButtonStyle={{backgroundColor: theme.primary}}
              selectedIndex={FicaIndex}
              buttons={buttons}
              containerStyle={styles.buttongroupstyle}
            />
          </View>
        </View>
        {FicaIndex == 1 ? (
          <ScrollView style={styles.regform}>
            <View style={styles.dpipradiostyles}>
              <Text>Is Domestic Prominent Influential person(DPIP)?</Text>
              <Switch
                color={theme.primary}
                style={styles.switchcontainer}
                value={isDPIP}
                onValueChange={updateDPIP}
              />
            </View>
            <View style={styles.fpipradiostyles}>
              <Text>Is Foreign Prominent Public Official(FPPO)?</Text>
              <Switch
                color={theme.primary}
                style={styles.switchcontainer}
                value={isFPPO}
                onValueChange={updateFPPO}
              />
            </View>
            <View style={styles.titleinput}>
              <TextInput
                style={CommonStyles.textinputstyle}
                label="Name/Surname"
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
            <View style={styles.dropdowncontainer}>
              <CustomDropdown
                relation={relationship}
                default={'SELECT RELATIONSHIP'}
                mode={0}
                isEnabled={false}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.regform}></View>
        )}
      </View>
      <View style={styles.buttoncontainer}>
        <View style={styles.custombutton}>
          <CustomButton text="PROCEED" onPressEvent={() => saveInfo()} />
        </View>
      </View>

      {props.modalPopup.isModalVisible == true ? (
        <CongratsModal state={0} navigation={props.navigation} />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flex: Platform.OS == 'ios' ? 0.18 : 0.3,
    flexDirection: 'row',
  },
  infocontainer: {flex: 0.7},
  contentcontainer: {
    flex: 0.8,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  contentheaderstyle: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  radiogroup: {
    flex: 0.1,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
  },
  regform: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  dpipradiostyles: {
    flex: 0.15,
    flexDirection: 'row',
    paddingTop: 10,
  },
  fpipradiostyles: {
    flex: 0.18,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
  },
  buttongroupstyle: {
    flex: 0.5,
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  switchcontainer: {
    flex: 0.7,
  },

  dropdowncontainer: {
    flex: 1,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
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
  titleinput: {
    flex: 0.4,
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

  buttoncontainerstyle: {
    flex: 0.5,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  assciatedpip: {
    flex: 0.5,
  },
  buttoncontainer: {
    flex: 0.15,
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 5,
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
    get_BirthYear: Birth_Year => {
      dispatch({
        type: GET_BIRTH_YEAR,
        payload: {
          Birth_Year,
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
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(FicaScreen);
