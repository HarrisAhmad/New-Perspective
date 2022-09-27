import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {connect} from 'react-redux';

import {GET_USER_STATUS} from '../store/actiontypes';
import theme from '../common/theme';
import {SaveAsyncStorage} from '../common/commonstoragefunc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomBottomDrawerTab = props => {
  const logout = async () => {
    //await SaveAsyncStorage('UserLoggedIn', 'false');

    props.navigation.navigate('Login', {screen: 'Signin'});
    props.navigation.closeDrawer();
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#EDA640'}}>
        <ImageBackground
          source={require('../assets/images/greenbgs.png')}
          style={{padding: 20, backgroundColor: 'orange'}}>
          {/* <Image
            source={require('../assets/images/accounticon.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          /> */}
          <Text
            style={{
              color: theme.primary,
              fontSize: 20,
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: theme.fontBold,
              marginBottom: 5,
            }}>
            {props.userinfo.userName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: theme.fontBold,
                marginRight: 5,
              }}></Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: theme.fontBold,
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: theme.fontBold,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userinfo: state.userinfo,
    userStatus: state.userStatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserLoggedInStatus: isUserLoggedIn => {
      dispatch({
        type: GET_USER_STATUS,
        payload: {
          isUserLoggedIn,
        },
      });
    },
  };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(CustomBottomDrawerTab);
