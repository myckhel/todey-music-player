import React from 'react';
import { Platform, Dimensions } from 'react-native';
import {
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MusicScreen from '../screens/Stacks/MusicScreen';
import MainMenu from "../components/app/MainMenu";

// Menu stacks
import Directory from "../screens/MenuStacks/DirectoryStack";
import Settings from '../screens/MenuStacks/SettingsStack';
import Online from '../screens/MenuStacks/OnlineStack';
import Activity from '../screens/MenuStacks/ActivityStack';
import About from '../screens/MenuStacks/AboutStack';
import PlayingScreen from '../screens/Stacks/PlayStack';

import { TopBar } from '../components/TopBar';
import color from '../constants/Colors';


const MainStack = createStackNavigator({
  // Music: MusicTab,
  Music: MusicScreen,
  Directory: Directory,
  Activity: Activity,
  Online: Online,
  Settings: Settings,
  About: About,
  Playing: {screen: PlayingScreen },
}, {
  defaultNavigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: color.primary,
    },
    header: <TopBar navigation={navigation} />,
    // headerLeft:(
    //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    //     <TabBarIconE name="dots-three-vertical" style={[menu]} />
    //   <
    // ),
    headerStyle: { paddingRight: 10, paddingLeft: 15 },
    headerTintColor: '#000',
  }),
})

const drawernav = createDrawerNavigator({
  MainMenu: {
    screen: MainStack,
  },
}, {
  contentComponent: MainMenu,
  drawerWidth: Dimensions.get('window').width - 120,
});

export default createAppContainer(drawernav
  // HomeStack,
  // SettingsStack
  // LinksStack,
  // SettingsStack,
);

// import MusicNavigator from './MusicNavigator';
// import { MusicTab } from './MusicNavigator';

// const HomeStack = createStackNavigator({
//   Music: {screen: MusicNavigator},
//   Home: {screen: HomeScreen }
// },
// {
//   initialRouteName: "Home"
// }
// );

// HomeStack.navigationOptions = {
  // tabBarLabel: 'Home',
  // header: <TopBar />,
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={
  //       Platform.OS === 'ios'
  //         ? `ios-information-circle${focused ? '' : '-outline'}`
  //         : 'md-home'
  //     }
  //   />
  // ),
// };

// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });
//
// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };
//
// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });
//
// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };
