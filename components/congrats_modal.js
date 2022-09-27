import React, {useState, useEffect} from 'react';
import {Overlay} from 'react-native-elements';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import theme from '../common/theme';
import {Congrats} from '../common/textcontent';
import CommonStyles from '../common/commonstyles';
import {connect} from 'react-redux';
import {SHOW_INFOMODAL} from '../store/actiontypes';
import {CheckBox} from 'react-native-elements';
import CustomButton from '../components/custombutton';

const CongratsModal = props => {
  const [visible, setVisible] = useState(true);
  const [header, setheader] = useState('');

  const toggleOverlay = () => {
    props.modalShown(false);
  };

  const finishApp = () => {
    toggleOverlay();
    props.navigation.navigate('Application Processed');
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.container}>
        <View style={CommonStyles.headerstylemodal}>
          <Text style={CommonStyles.header}>Congratulation</Text>
        </View>
        <View style={styles.contentcontainer}>
          {/* <View style={CommonStyles.subheaderstyle}>
                  <Text style={CommonStyles.subheadercenter}>{subheader}</Text>
                </View> */}
          <View style={styles.contentstyle}>
            <Text style={CommonStyles.subheadercenter}>{Congrats()}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.loginbutton}
          onPress={() => finishApp()}>
          <Text style={CommonStyles.buttontextstyle}>Continue</Text>
        </TouchableOpacity>
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
    backgroundColor: theme.primary,
  },
  contentcontainer: {flex: 1, justifyContent: 'center'},
  contentstyle: {
    flex: 0.8,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  loginbutton: {
    backgroundColor: '#66000000',
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

export default connectComponent(CongratsModal);
