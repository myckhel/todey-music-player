import React from 'react';
// const { StatusBarManager } = NativeModules;
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import TabBarIconI, { TabBarIconE, TabBarIconM } from '../components/TabBarIcon';
import color from '../constants/Colors';

export const TopBar = ({ navigation, title }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{}}>
      <TabBarIconI name="ios-menu" style={[styles.menu]} />
    </TouchableOpacity>
    <View style={{justifyContent: 'center', flex: 1}}>
      <Text style={styles.headerText}>{title ? title : 'Todey Player'}</Text>
    </View>
    <TouchableOpacity onPress={() => {}} style={styles.secondaryMenu}>
      <TabBarIconI name="md-search" style={[styles.menu]} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}} style={styles.secondaryMenu}>
      <TabBarIconE name="dots-three-vertical" style={[styles.menu]} />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: StatusBar.currentHeight,
    backgroundColor: color.primary,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: color.primary,
    paddingVertical: 10,
  },
  primaryMenu: {
    // position: 'absolute',
    // left: 0
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'space-mono',
    fontWeight: 'bold',
    color: color.black,
    textAlign: 'center',
  },
  secondaryMenu: {
    // position: 'absolute',
    // right: 0
  },
  menu: {
    padding: 5,
    marginHorizontal: 9,
    marginVertical: 5,
    color: color.black
  }
})
