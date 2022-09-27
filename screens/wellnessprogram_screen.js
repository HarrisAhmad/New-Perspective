import React, {useState, useEffect, useRef} from 'react';
import CommonStyles from '../common/commonstyles';
import {
  Health,
  HealthScreening,
  Pap,
  PapSmears,
  Psa,
  PSAScreening,
  Vaccination,
  VaccinationProgram,
  Telephonic,
  TelephonicAssistance,
} from '../common/textcontent';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import theme from '../common/theme';

const WellnessProgramScreen = props => {
  const [subheader, setSubehader] = useState(Health);
  //const [counter, setCounter] = useState(0);
  const [content, setContent] = useState(HealthScreening);
  const [showEndButton, setEndButton] = useState(false);
  const [backgroudImage, setBackgroundImage] = useState(
    require('../assets/images/purplebgs.png'),
  );

  const counter = useRef(0);

  const endButtonHandler = () => {
    props.navigation.goBack();
  };

  const checkCounter = state => {
    if (state == 0 && counter.current <= 4) {
      counter.current = counter.current + 1;
    }

    if (state == 0 && counter.current == 1) {
      setSubehader(Pap);
      setContent(PapSmears);
    }

    if (state == 0 && counter.current == 2) {
      setSubehader(Psa);
      setContent(PSAScreening);
    }

    if (state == 0 && counter.current == 3) {
      setSubehader(Vaccination);
      setContent(VaccinationProgram);
      setBackgroundImage(require('../assets/images/greenbgs.png'));
    }

    if (state == 0 && counter.current == 4) {
      setSubehader(Telephonic);
      setContent(TelephonicAssistance);
      setEndButton(true);
      //   setBackgroundImage(require('../assets/images/greenbgs.png'));
    }
    ///////////////////PREVIOUS BUTTON////////////////////////
    if (state == 1 && counter.current > 0) {
      counter.current = counter.current - 1;
    }
    if (state == 1 && counter.current == 0) {
      setSubehader(Health);
      setContent(HealthScreening);
    }

    if (state == 1 && counter.current == 1) {
      setSubehader(Pap);
      setContent(PapSmears);
    }

    if (state == 1 && counter.current == 2) {
      setSubehader(Psa);
      setContent(PSAScreening);
      setBackgroundImage(require('../assets/images/purplebgs.png'));
    }

    if (state == 1 && counter.current == 3) {
      setSubehader(Vaccination);
      setContent(VaccinationProgram);
      setEndButton(false);
    }

    if (state == 1 && counter.current == 4) {
      setSubehader(Telephonic);
      setContent(TelephonicAssistance);
      setBackgroundImage(require('../assets/images/greenbgs.png'));
    }
  };
  return (
    <ImageBackground
      style={CommonStyles.backgroundImageStyle}
      source={backgroudImage}>
      <View style={styles.container}>
        <View style={CommonStyles.headerstyleprogram}>
          <Text style={CommonStyles.header}>Wellness Program</Text>
        </View>
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
              <Text style={CommonStyles.subheadercenter}>{content}</Text>
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

export default WellnessProgramScreen;
