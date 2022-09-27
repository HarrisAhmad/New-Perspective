import React, {useState, useEffect} from 'react';
import {Overlay} from 'react-native-elements';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {SHOW_DISCLOSURE} from '../store/actiontypes';
import {
  DiscHeader,
  DiscContent,
  DiscBeneficiaryContent,
} from '../common/textcontent';
import CustomButton from '../components/custombutton';
import theme from '../common/theme';

const DisclosureModal = props => {
  const [visible, setVisible] = useState(true);
  const [header, setHeader] = useState(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    checkDisclosureMode();
  }, []);

  const checkDisclosureMode = () => {
    if (props.mode == 0) {
      setHeader(DiscHeader);
      setText(DiscContent);
    }
    if (props.mode == 1) {
      setHeader(DiscHeader);
      setText(DiscBeneficiaryContent);
    }
  };

  const proceed = () => {
    props.isDisclosureShown(false);
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        //  onBackdropPress={toggleOverlay}
        overlayStyle={styles.container}>
        <View style={styles.headerStyle}>
          <View style={CommonStyles.subheaderleft}>
            <Text style={CommonStyles.header}>{header}</Text>
          </View>
          <View style={{flex: 0.39, paddingTop: 8}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>
        </View>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}>
          <Text style={styles.paracenter}>{text}</Text>
          <Image
            source={require('../assets/images/UnityHealth_Logo.png')}
            style={styles.bottomlogoImage}
          />
          <Image
            source={require('../assets/images/Constantia_logo.png')}
            style={styles.bottomlogoImage}
          />
        </ScrollView>

        <View style={styles.buttoncontainer}>
          <CustomButton text="PROCEED" onPressEvent={() => proceed()} />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    flexDirection: 'column',
    padding: 2,
    width: '95%',
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerStyle: {
    flex: 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paracenter: {
    flex: 1,
    padding: 5,
    fontSize: 18,
    color: '#ffffff',
    fontFamily: theme.font,
  },

  textstyle: {
    flex: 1,
    justifyContent: 'flex-start',
    color: '#ffffff',
    fontSize: 18,
  },
  checkboxcontainer: {
    flex: 0.3,
    padding: 5,
    justifyContent: 'flex-end',
  },
  contentcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'red',
  },
  contentstyle: {
    flex: 0.3,
    backgroundColor: 'green',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  buttoncontainerstyle: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 5,
  },
  buttoncontainer: {
    flex: 0.14,
    padding: 5,
    justifyContent: 'center',
  },

  logoImage: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    padding: 20,
  },

  bottomlogoImage: {
    paddingVertical: 20,
    marginTop: 10,
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
  custombutton: {
    justifyContent: 'flex-end',

    marginBottom: 1,
    flex: 0.2,
    padding: 5,
    flexDirection: 'column',
  },
});

const mapStateToProps = state => {
  return {
    modalPopup: state.modalPopup,
    userinfo: state.userinfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
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

export default connectComponent(DisclosureModal);
