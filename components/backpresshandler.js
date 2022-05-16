import {BackHandler} from 'react-native';
export default BackPressHandler = callback => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
};
