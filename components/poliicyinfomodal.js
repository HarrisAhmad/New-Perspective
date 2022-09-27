import React, {useState, useEffect} from 'react';
import {Overlay} from 'react-native-elements';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CommonStyles from '../common/commonstyles';
import {connect} from 'react-redux';
import {SHOW_INFOMODAL} from '../store/actiontypes';
import {ScrollView} from 'react-native-gesture-handler';
import theme from '../common/theme';

const PolicyInfoModal = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {}, []);

  const toggleOverlay = () => {
    props.modalShown(false);
  };

  const navigateTo = mode => {
    toggleOverlay();
    if (mode == 0) {
      props.navigation.navigate('Primary Care');
    }
    if (mode == 1) {
      props.navigation.navigate('Wellness Program');
    }
    if (mode == 2) {
      props.navigation.navigate('Hospital Care');
    }
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.container}>
        <View style={styles.headerStyle}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>PLAN INFORMATION</Text>
          </View>
          <View style={{flex: 0.29, paddingTop: 5}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>
        </View>
        <View style={{flex: 0.8}}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}>
            {props.policyMode == 0 ? (
              <View style={styles.policycontainer}>
                <View style={CommonStyles.subheaderleft}>
                  <Text style={CommonStyles.subheaderstyle}>
                    Primary Care - Day to Day Cover
                  </Text>
                  <View style={{padding: 10}}></View>
                  <View style={styles.policysubHeaderstyle}>
                    <Text style={CommonStyles.subheaderstyle}>
                      Plan Benefits
                    </Text>
                    <View style={styles.buttoncontainer}>
                      <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.loginbutton}
                        onPress={() => navigateTo(0)}>
                        <Text style={styles.textstylelogin}>MORE INFO</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      padding: 0.5,
                      height: 1,
                      width: '100%',
                      backgroundColor: theme.primary,
                    }}
                  />
                </View>
                <View style={styles.benifitsstyle}>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - GP Consultations
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - GP Procedures
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Nurse Consultations
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - TeleMedicine Consultations
                  </Text>

                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Acute Medication
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Chronic Medication
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Basic and Emergency Dentistry Treatment
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Optometry
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Pathology
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Radiology
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Maternity
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Specialist Consultations
                  </Text>
                </View>

                <View style={{padding: 10}}></View>
                <View style={styles.policysubHeaderstyle}>
                  <Text style={CommonStyles.subheaderstyle}>
                    {' '}
                    Wellness Programme
                  </Text>
                  <View style={styles.buttoncontainerWellnes}>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      style={styles.loginbutton}
                      onPress={() => navigateTo(1)}>
                      <Text style={styles.textstylelogin}>MORE INFO</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    padding: 0.5,
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.primary,
                  }}
                />
                <View style={styles.benifitsstyle}>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Health Screenings
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Pap Smears
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - PSA Screening
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Vaccination Programme
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Assistance programme(AP)
                  </Text>
                </View>

                <View style={{padding: 10}}></View>
              </View>
            ) : null}

            {props.policyMode == 1 ? (
              <View style={styles.policycontainer}>
                <View style={styles.policysubHeaderstyle}>
                  <Text style={CommonStyles.subheaderstyle}>
                    Private Hospital Cover
                  </Text>
                  <View style={styles.buttoncontainerWellnes}>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      style={styles.loginbutton}
                      onPress={() => navigateTo(2)}>
                      <Text style={styles.textstylelogin}>MORE INFO</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    padding: 0.5,
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.primary,
                  }}
                />

                <View style={styles.benifitsstyle}>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Inpatient Hospital Treatment(Accidents Only)
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Inpatient Hospital Stabalisation(Emergency Only)
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Outpatient Casualty Treatment(Emergency Only)
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - MRI and CT Scans(Accidents Only)
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Physiotherapy and Occupational Therapists
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Accidental Death Benefit
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Emergency Services
                  </Text>
                  <Text style={CommonStyles.policyBenefitTextstyle}>
                    - Assistance Programme (AP)
                  </Text>
                </View>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    flexDirection: 'column',
    padding: 2,
    width: '95%',
    backgroundColor: '#ffffff',
  },
  headerStyle: {
    flex: 0.12,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  logoImage: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    padding: 20,
  },
  policycontainer: {
    flex: 0.8,
    padding: 4,
  },
  policysubHeaderstyle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  benifitsstyle: {
    flex: 1,
    padding: 4,
  },
  buttoncontainerstyle: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 5,
    marginBottom: 10,
  },
  buttoncontainer: {
    flex: 0.5,
    padding: 5,
  },
  buttoncontainerWellnes: {
    flex: 0.8,
    padding: 5,
  },
  footerTextStyle: {
    flex: 1,
    backgroundColor: 'red',
  },
  loginbutton: {
    backgroundColor: '#66000000',
  },
  textstylelogin: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: theme.fontBold,
  },
});

const mapStateToProps = state => {
  return {
    modalPopup: state.modalPopup,
  };
};
const mapDispatchToProps = dispatch => {
  return {
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

export default connectComponent(PolicyInfoModal);
