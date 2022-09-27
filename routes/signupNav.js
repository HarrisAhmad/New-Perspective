import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetStartedScreen from '../screens/getstarted';
import SignupScreen from '../screens/signup';
import SigninScreen from '../screens/signin_screen';
import UserInfoScreen from '../screens/userinfo_screen';
import SummaryScreen from '../screens/summary_screen';
import PrimaryCareScreen from '../screens/primarycare_screen';
import WellnessProgramScreen from '../screens/wellnessprogram_screen';
import HospitalCareScreen from '../screens/hospitalcare_screen';
import AppFlow from '../routes/appflow';

import {
  screenOptionswithNoBackNav,
  screenOptionswithBackNav,
} from '../common/commonfunctions';

const Stack = createStackNavigator();

export default SignupNavFlow = () => {
  return (
    <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="User Info"
        component={UserInfoScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Policy Breakdown"
        component={SummaryScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Primary Care"
        component={PrimaryCareScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Wellness Program"
        component={WellnessProgramScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Hospital Care"
        component={HospitalCareScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="Home"
        component={AppFlow}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
