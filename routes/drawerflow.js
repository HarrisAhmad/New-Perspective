import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {drawerOptionswithNoBackNav} from '../common/commonfunctions';
import ProfileScreen from '../screens/profile_screen';
import SigninScreen from '../screens/signin_screen';
import SignupNav from '../routes/signupNav';
import CustomBottomDrawerTab from '../components/CustomBottomDrawerTab';

const Drawer = createDrawerNavigator();

const DrawerFlow = props => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomBottomDrawerTab {...props} />}>
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={drawerOptionswithNoBackNav('Profile')}
      />
      <Drawer.Screen
        name="Login"
        component={SignupNav}
        options={{
          drawerItemStyle: {height: 0},
          headerBackTitleVisible: false,
          title: '',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerFlow;
