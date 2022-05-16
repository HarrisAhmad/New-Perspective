import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetStartedScreen from '../screens/getstarted';
import SignUp from '../screens/signup';
import Verification from '../screens/verification';
import ApplicationProcessed from '../screens/applicationprocessed';
import UserInfoScreen from '../screens/userinfo_screen';
import MonthlySummaryScreenn from '../screens/summary_screen';
import PrimaryCareScreen from '../screens/primarycare_screen';
import WellnessProgramScreen from '../screens/wellnessprogram_screen';
import HospitalCareScreen from '../screens/hospitalcare_screen';
import PersonalInfo_Screen from '../screens/personalinfo_screen';
import ContactDetailScreen from '../screens/contactdetail_screen';
import DependantScreen from '../screens/dependants_screen';
import PaymentDetailScreen from '../screens/paymnetdetail_screen';
import FicaScreen from '../screens/fica_screen';
import BeneficiaryScreen from '../screens/beneficiary_screen';
import DocumentScreen from '../screens/documents_screen';
import ProfileScreen from '../screens/profile_screen';
import ActionBarImage from '../components/actionbar_image';
import theme from '../common/theme';

const Stack = createStackNavigator();
const screenOptionswithNoBackNav = () => {
  return {
    title: '',
    headerTitleStyle: {
      color: theme.primary,
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#F3F1F1',
      height: 60,
    },

    headerLeft: () => null,
    headerRight: () => <ActionBarImage />,
  };
};

const screenOptionswithBackNav = () => {
  return {
    title: '',
    headerTitleStyle: {
      flex: 1,
      color: '#fcb40c',
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#F3F1F1',
      height: 60,
    },
    headerRight: () => <ActionBarImage />,
  };
};

export const InitialNavigator = () => {
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
        name="Policy Breakdown"
        component={MonthlySummaryScreenn}
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
        name="PersonalInfo Screen"
        component={PersonalInfo_Screen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="ContactDetails Form"
        component={ContactDetailScreen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Verify OTP"
        component={Verification}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Dependant Screen"
        component={DependantScreen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Payment Details"
        component={PaymentDetailScreen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Fica Questionnaire"
        component={FicaScreen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Beneficiary Nomination"
        component={BeneficiaryScreen}
        options={screenOptionswithNoBackNav}
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

      <Stack.Screen
        name="Proflie Screen"
        component={ProfileScreen}
        options={screenOptionswithNoBackNav}
      />

      <Stack.Screen
        name="Sign up"
        component={SignUp}
        options={screenOptionswithBackNav}
      />
    </Stack.Navigator>
  );
};

const _handleNavigator = modes => {
  if (modes.personalInfoID == null) {
    return (
      <>
        <Stack.Screen
          name="PersonalInfo Screen"
          component={PersonalInfo_Screen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="ContactDetails Form"
          component={ContactDetailScreen}
          options={screenOptionswithNoBackNav}
        />
        <Stack.Screen
          name="Verify OTP"
          component={Verification}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Dependant Screen"
          component={DependantScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Payment Details"
          component={PaymentDetailScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Fica Questionnaire"
          component={FicaScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Beneficiary Nomination"
          component={BeneficiaryScreen}
          options={screenOptionswithNoBackNav}
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }

  if (
    (modes.personalInfoID != null && modes.contactInfoID == null) ||
    modes.isUserVerified == null
  ) {
    return (
      <>
        <Stack.Screen
          name="ContactDetails Form"
          component={ContactDetailScreen}
          options={screenOptionswithNoBackNav}
        />
        <Stack.Screen
          name="Verify OTP"
          component={Verification}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Dependant Screen"
          component={DependantScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Payment Details"
          component={PaymentDetailScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Fica Questionnaire"
          component={FicaScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Beneficiary Nomination"
          component={BeneficiaryScreen}
          options={screenOptionswithNoBackNav}
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }

  if (
    modes.personalInfoID != null &&
    modes.contactInfoID != null &&
    modes.isUserVerified != null &&
    modes.isUserDependantAdded == null
  ) {
    return (
      <>
        <Stack.Screen
          name="Dependant Screen"
          component={DependantScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Payment Details"
          component={PaymentDetailScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Fica Questionnaire"
          component={FicaScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Beneficiary Nomination"
          component={BeneficiaryScreen}
          options={screenOptionswithNoBackNav}
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }

  if (
    modes.personalInfoID != null &&
    modes.contactInfoID != null &&
    modes.isUserVerified != null &&
    modes.isUserDependantAdded != null &&
    modes.isPaymentAdded == null
  ) {
    return (
      <>
        <Stack.Screen
          name="Payment Details"
          component={PaymentDetailScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Fica Questionnaire"
          component={FicaScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Beneficiary Nomination"
          component={BeneficiaryScreen}
          options={screenOptionswithNoBackNav}
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }

  if (
    modes.personalInfoID != null &&
    modes.contactInfoID != null &&
    modes.isUserVerified != null &&
    modes.isUserDependantAdded != null &&
    modes.isPaymentAdded != null &&
    modes.isFicaAdded == null
  ) {
    return (
      <>
        <Stack.Screen
          name="Fica Questionnaire"
          component={FicaScreen}
          options={screenOptionswithNoBackNav}
        />

        <Stack.Screen
          name="Beneficiary Nomination"
          component={BeneficiaryScreen}
          options={screenOptionswithNoBackNav}
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }

  if (
    modes.personalInfoID != null &&
    modes.contactInfoID != null &&
    modes.isUserVerified != null &&
    modes.isUserDependantAdded != null &&
    modes.isPaymentAdded != null &&
    modes.isFicaAdded != null &&
    modes.isBeneficiaryAdded == null
  ) {
    return (
      <>
        <Stack.Screen
          name="Beneficiary Nomination"
          component={BeneficiaryScreen}
          options={screenOptionswithNoBackNav}
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }

  // if (
  //   modes.personalInfoID != null &&
  //   modes.contactInfoID != null &&
  //   modes.isUserVerified != null &&
  //   modes.isUserDependantAdded != null &&
  //   modes.isPaymentAdded != null &&
  //   modes.isFicaAdded != null &&
  //   modes.isBeneficiaryAdded != null
  // ) {
  //   return (
  //     <>
  //       <Stack.Screen
  //         name="Docs Required"
  //         component={DocumentScreen}
  //         options={{
  //           title: '',
  //           headerTitleStyle: {
  //             color: theme.primary,
  //             fontSize: 20,
  //           },
  //           headerBackTitleVisible: false,
  //           headerStyle: {
  //             backgroundColor: '#F3F1F1',
  //             height: 60,
  //           },
  //           headerLeft: () => null,
  //           headerRight: () => <ActionBarImage />,
  //         }}
  //       />

  //       <Stack.Screen
  //         name="Application Processed"
  //         component={ApplicationProcessed}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //     </>
  //   );
  // }
  if (
    modes.personalInfoID != null &&
    modes.contactInfoID != null &&
    modes.isUserVerified != null &&
    modes.isUserDependantAdded != null &&
    modes.isPaymentAdded != null &&
    modes.isFicaAdded != null &&
    modes.isBeneficiaryAdded != null &&
    modes.isDocFileAdded == null
  ) {
    return (
      <>
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
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }
  if (
    modes.personalInfoID != null &&
    modes.contactInfoID != null &&
    modes.isUserVerified != null &&
    modes.isUserDependantAdded != null &&
    modes.isPaymentAdded != null &&
    modes.isFicaAdded != null &&
    modes.isBeneficiaryAdded != null &&
    modes.isDocFileAdded != null
  ) {
    return (
      <>
        {/* <Stack.Screen
          name="Application Processed"
          component={ApplicationProcessed}
          options={screenOptionswithNoBackNav}
        /> */}
        <Stack.Screen
          name="Proflie Screen"
          component={ProfileScreen}
          options={screenOptionswithNoBackNav}
        />
      </>
    );
  }
};

export const PersonalInfoNavigator = props => {
  return <Stack.Navigator>{_handleNavigator(props)}</Stack.Navigator>;
};
