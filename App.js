import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';
import ytur from "./func/window"
import color from './constants/Colors';

import AppNavigator from './navigation/AppNavigator';
// import MusicNavigator from './navigation/MusicNavigator';

export default function App(props) {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.alternative,
  },
});
