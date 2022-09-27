import React, {useRef, useState} from 'react';

import theme from '../common/theme';
import CommonStyles from '../common/commonstyles';
import {
  PrimaryCareSummary,
  Summary,
  GPHeader,
  GPConsultation,
  GPProHeader,
  GPProcedures,
  NurseHeader,
  NurseConsultation,
  TeleMedicineHeader,
  TelemedicineConsultation,
  SpecialistHeader,
  SpecialistConsultation,
  AcuteHeader,
  AcuteMedication,
  ChronicHeader,
  ChronicMedication,
  EmergencyDentist,
  DentistryTreatment,
  Optometry,
  OptometryLimited,
  Radiology,
  RadiologyLimited,
  Pathology,
  PathologyLimited,
  Maternity,
  MaternityLimited,
} from '../common/textcontent';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PrimaryCareScreen = props => {
  const [subheader, setSubehader] = useState(Summary);
  //const [counter, setCounter] = useState(0);
  const [content, setContent] = useState(PrimaryCareSummary);
  const [showEndButton, setEndButton] = useState(false);
  const [backgroudImage, setBackgroundImage] = useState(
    require('../assets/images/purplebgs.png'),
  );

  const counter = useRef(0);

  const endButtonHandler = () => {
    props.navigation.goBack();
  };

  const checkCounter = state => {
    if (state == 0 && counter.current <= 11) {
      counter.current = counter.current + 1;
    }

    if (state == 0 && counter.current == 1) {
      setSubehader(GPHeader);
      setContent(GPConsultation);
      setBackgroundImage(require('../assets/images/purplebgs.png'));
    }
    if (state == 0 && counter.current == 2) {
      setSubehader(GPProHeader);
      setContent(GPProcedures);
      //  setBackgroundImage(require('../assets/images/gpconsultation.png'));
    }
    if (state == 0 && counter.current == 3) {
      setSubehader(NurseHeader);
      setContent(NurseConsultation);
      //   setBackgroundImage(require('../assets/images/nurseconsultations.png'));
    }
    if (state == 0 && counter.current == 4) {
      setSubehader(TeleMedicineHeader);
      setContent(TelemedicineConsultation);
      setBackgroundImage(require('../assets/images/greenbgs.png'));
    }
    if (state == 0 && counter.current == 5) {
      setSubehader(SpecialistHeader);
      setContent(SpecialistConsultation);
      // setBackgroundImage(require('../assets/images/specialist.png'));
    }
    if (state == 0 && counter.current == 6) {
      setSubehader(AcuteHeader);
      setContent(AcuteMedication);
      //    setBackgroundImage(require('../assets/images/medicine.png'));
    }
    if (state == 0 && counter.current == 7) {
      setSubehader(ChronicHeader);
      setContent(ChronicMedication);
      //  setBackgroundImage(require('../assets/images/medicine.png'));
    }
    if (state == 0 && counter.current == 8) {
      setSubehader(EmergencyDentist);
      setContent(DentistryTreatment);
      //    setBackgroundImage(require('../assets/images/emergency.png'));
    }
    if (state == 0 && counter.current == 9) {
      setSubehader(Optometry);
      setContent(OptometryLimited);
      setBackgroundImage(require('../assets/images/blue-bgs.png'));
    }
    if (state == 0 && counter.current == 10) {
      setSubehader(Radiology);
      setContent(RadiologyLimited);
      //  setBackgroundImage(require('../assets/images/pathology-screenings.png'));
    }
    if (state == 0 && counter.current == 11) {
      setSubehader(Pathology);
      setContent(PathologyLimited);
      //  setBackgroundImage(require('../assets/images/pathology-screenings.png'));
    }
    if (state == 0 && counter.current == 12) {
      setSubehader(Maternity);
      setContent(MaternityLimited);
      setEndButton(true);
      //    setBackgroundImage(require('../assets/images/mri-ct-scans.png'));
    }
    /////////////////// PREVIOUS BUTTON  //////////////////////
    if (state == 1 && counter.current > 0) {
      counter.current = counter.current - 1;
    }
    if (state == 1 && counter.current == 0) {
      setSubehader(Summary);
      setContent(PrimaryCareSummary);
      //  setBackgroundImage(require('../assets/images/purplebgs.png'));
    }
    if (state == 1 && counter.current == 1) {
      setSubehader(GPHeader);
      setContent(GPConsultation);
      //   setBackgroundImage(require('../assets/images/gpconsultation.png'));
    }
    if (state == 1 && counter.current == 2) {
      setSubehader(GPProHeader);
      setContent(GPProcedures);
      //     setBackgroundImage(require('../assets/images/gpconsultation.png'));
    }
    if (state == 1 && counter.current == 3) {
      setSubehader(NurseHeader);
      setContent(NurseConsultation);
      setBackgroundImage(require('../assets/images/purplebgs.png'));
    }
    if (state == 1 && counter.current == 4) {
      setSubehader(TeleMedicineHeader);
      setContent(TelemedicineConsultation);
      // setBackgroundImage(require('../assets/images/medicine.png'));
    }
    if (state == 1 && counter.current == 5) {
      setSubehader(SpecialistHeader);
      setContent(SpecialistConsultation);
      //  setBackgroundImage(require('../assets/images/specialist.png'));
    }
    if (state == 1 && counter.current == 6) {
      setSubehader(AcuteHeader);
      setContent(AcuteMedication);
      //  setBackgroundImage(require('../assets/images/medicine.png'));
    }
    if (state == 1 && counter.current == 7) {
      setSubehader(ChronicHeader);
      setContent(ChronicMedication);
      // setBackgroundImage(require('../assets/images/medicine.png'));
    }
    if (state == 1 && counter.current == 8) {
      setSubehader(EmergencyDentist);
      setContent(DentistryTreatment);
      setBackgroundImage(require('../assets/images/greenbgs.png'));
    }
    if (state == 1 && counter.current == 9) {
      setSubehader(Optometry);
      setContent(OptometryLimited);
      //     setBackgroundImage(require('../assets/images/medicine.png'));
    }
    if (state == 1 && counter.current == 10) {
      setSubehader(Radiology);
      setContent(RadiologyLimited);
      setEndButton(false);
      //   setBackgroundImage(require('../assets/images/pathology-screenings.png'));
    }
    if (state == 1 && counter.current == 11) {
      setSubehader(Pathology);
      setContent(PathologyLimited);
      setEndButton(false);
      //   setBackgroundImage(require('../assets/images/pathology-screenings.png'));
    }
    if (state == 1 && counter.current == 12) {
      setSubehader(Maternity);
      setContent(MaternityLimited);
      setBackgroundImage(require('../assets/images/blue-bgs.png'));

      console.log('Count' + counter.current);
    }
  };
  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={backgroudImage}>
      <View style={styles.container}>
        <View style={CommonStyles.headerstyleprogram}>
          <Text style={CommonStyles.header}>PRIMARY CARE BENEFITS</Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 0.5}}>
            <View style={styles.contentcontainer}>
              <View style={CommonStyles.subheaderstyle}>
                <Text style={CommonStyles.subheadercenter}>{subheader}</Text>
                <View
                  style={{
                    padding: 0.5,
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.primary,
                  }}
                />
              </View>
              <View style={styles.contentstyle}>
                {/* <ImageBackground
                style={CommonStyles.backgroundImageStylePlan}
                source={backgroudImage}> */}
                <Text style={CommonStyles.paracenter}>{content}</Text>
                {/* </ImageBackground> */}
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttoncontainerstyle}>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.loginbutton}
                onPress={() => checkCounter(1)}>
                <Image
                  source={require('../assets/images/previousimagebutton.png')}
                  style={styles.nextImage}
                />
                <Text style={styles.textstylePrevious}>PREVIOUS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttoncontainer}>
              {!showEndButton ? (
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.loginbutton}
                  onPress={() => checkCounter(0)}>
                  <Image
                    source={require('../assets/images/nextimagebutton.png')}
                    style={styles.nextImage}
                  />
                  <Text style={styles.textstyleNext}>NEXT</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.loginbutton}
                  onPress={() => endButtonHandler()}>
                  <Image
                    source={require('../assets/images/endbutton.png')}
                    style={styles.endButtonImage}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  contentcontainer: {flex: 1, justifyContent: 'center'},
  contentstyle: {
    flex: 0.8,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  buttoncontainerstyle: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
  },

  buttoncontainer: {
    flex: 0.5,
    padding: 5,
    justifyContent: 'flex-end',
  },
  loginbutton: {
    backgroundColor: '#66000000',
  },
  textstylePrevious: {
    color: theme.textcolor,
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  textstyleNext: {
    color: theme.primary,
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  nextImage: {width: '100%', height: 28, resizeMode: 'contain', padding: 10},
  endButtonImage: {
    width: '100%',
    height: '91%',
    resizeMode: 'contain',
    padding: 10,
  },
});

export default PrimaryCareScreen;
