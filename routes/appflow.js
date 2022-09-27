import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/profile_screen';
import SignupScreen from '../screens/signup';
import ApplicationProcessed from '../screens/applicationprocessed';
import UserInfoScreen from '../screens/userinfo_screen';
import SummaryScreen from '../screens/summary_screen';
import ContactDetailScreen from '../screens/contactdetail_screen';
import DependantScreen from '../screens/dependants_screen';
import PaymentDetailScreen from '../screens/paymnetdetail_screen';
import FicaScreen from '../screens/fica_screen';
import BeneficiaryScreen from '../screens/beneficiary_screen';
import PolicySummaryScreen from '../screens/policysummary_screen';
import DocumentScreen from '../screens/documents_screen';
import DrawerFlow from './drawerflow';
import {
  screenOptionswithNoBackNav,
  screenOptionswithBackNav,
} from '../common/commonfunctions';

const Stack = createStackNavigator();

export default AppFlow = props => {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen
        name="Drawer"
        component={DrawerFlow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Proflie Screen"
        component={ProfileScreen}
        options={screenOptionswithNoBackNav}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="User Info"
        component={UserInfoScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="Policy Breakdown"
        component={SummaryScreen}
        options={screenOptionswithBackNav}
      />
      <Stack.Screen
        name="ContactDetails Form"
        component={ContactDetailScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="Dependant Screen"
        component={DependantScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="Payment Details"
        component={PaymentDetailScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="Fica Questionnaire"
        component={FicaScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="Beneficiary Nomination"
        component={BeneficiaryScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="PolicySummary Screen"
        component={PolicySummaryScreen}
        options={screenOptionswithBackNav}
      />

      <Stack.Screen
        name="Docs Required"
        component={DocumentScreen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Application Processed"
        component={ApplicationProcessed}
        options={screenOptionswithNoBackNav}
      />
    </Stack.Navigator>
  );
};
