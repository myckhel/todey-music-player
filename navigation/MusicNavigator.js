import React from 'react';
import { Dimensions } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation';

import TabBarIconI, { TabBarIconE, TabBarIconM } from '../components/TabBarIcon';
import SongsTab from '../screens/Tabs/SongsTab';
import ArtistsTab from '../screens/Tabs/ArtistsTab';
import AlbumsTab from '../screens/Tabs/AlbumsTab';
import GenresTab from '../screens/Tabs/GenresTab';
import PlaylistsTab from '../screens/Tabs/PlaylistsTab';
import RatingsTab from '../screens/Tabs/RatingsTab';

import MainMenu from "../components/app/MainMenu";

import AboutScreen from '../screens/MenuStacks/AboutStack';
import ListableScreen from '../screens/Stacks/ListableScreen';
// import LinksScreen from '../screens/LinksScreen';

import { TopBar } from '../components/TopBar';
import color from '../constants/Colors';

// import MainStack from './MainTabNavigator'
const defaultNavigationOptions = ({navigation}) => ({
  header: <></>,
})

const common = {
  Listable: { screen: ListableScreen, },
}

const SongStacks = createStackNavigator({
  Musics: {screen: SongsTab},
  ...common,
},{ defaultNavigationOptions })

const ArtistStacks = createStackNavigator({
  Artists: {screen: ArtistsTab},
  ...common,
},{ defaultNavigationOptions })

const AlbumStacks = createStackNavigator({
  Albums: {screen: AlbumsTab},
  ...common,
},{ defaultNavigationOptions })

const PlaylistStacks = createStackNavigator({
  Playlists: {screen: PlaylistsTab},
  ...common,
},{ defaultNavigationOptions })

const GenreStacks = createStackNavigator({
  Genres: {screen: GenresTab},
  ...common,
},{ defaultNavigationOptions })

const RatingStacks = createStackNavigator({
  Ratings: {screen: RatingsTab},
  ...common,
},{ defaultNavigationOptions })


export const MusicTab = createMaterialTopTabNavigator({
  Songs: {screen:SongStacks,
    navigationOptions : {
      tabBarIcon: ({ focused }) => (
        <TabBarIconE
          focused={focused}
          name={ 'folder-music'}
        />
      ),
    },
  },
  Artists: {screen: ArtistStacks,
    navigationOptions: {
      // tabBarLabel: 'Artists',
      tabBarIcon: ({ focused }) => (
        <TabBarIconM
          focused={focused}
          name={'artist'}
        />
      ),
    }
  },
  Albums: {screen: AlbumStacks,
    navigationOptions: {
      // tabBarLabel: 'Albums',
      tabBarIcon: ({ focused }) => (
        <TabBarIconM
          focused={focused}
          name={'album'}
        />
      ),
    }
  },
  Playlists: {screen: PlaylistStacks,
    navigationOptions: {
    // tabBarLabel: 'Playlists',
      tabBarIcon: ({ focused }) => (
        <TabBarIconM
          focused={focused}
          name={'playlist-play'}
        />
      ),
    }
  },
  Genres: {screen: GenreStacks,
    navigationOptions: {
    // tabBarLabel: 'Genres',
      tabBarIcon: ({ focused }) => (
        <TabBarIconE
          focused={focused}
          name={'creative-commons-attribution'}
        />
      ),
    }
  },
  Ratings: {screen: RatingStacks,
    navigationOptions: {
    // tabBarLabel: 'Ratings',
      tabBarIcon: ({ focused }) => (
        <TabBarIconI
          focused={focused}
          name={'md-star-half'}
        />
      ),
    }
  },
},{
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: false,
  defaultNavigationOptions: ({navigation, screenProps}) => ({
    headerTintColor: color.white,
    ...getActiveChildNavigationOptions(navigation, screenProps)
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    tabStyle: {
      // backgroundColor: color.white,
    },
    iconStyle: {
      color: color.black,
      // backgroundColor: color.black
    },
    style: {
      backgroundColor: color.primary,
    },
    indicatorStyle: {
      borderBottomColor: color.black,
      borderBottomWidth: 2,
    },
    activeTintColor: color.black,
    activeBackgroundColor: color.black,
    inactiveTintColor: color.black,
  },
})

export default MusicStack = createAppContainer(MusicTab)
