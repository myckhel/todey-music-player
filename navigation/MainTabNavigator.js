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
    headerStyle: { paddingRight: 10, paddingLeft: 15 },
    headerTintColor: '#000',
  }),
})

const drawernav = createDrawerNavigator({
  MainStack,
}, {
  contentComponent: MainMenu,
  drawerWidth: Dimensions.get('window').width - 120,
});

export default createAppContainer(drawernav);
