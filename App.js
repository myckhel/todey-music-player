import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { connect } from 'react-redux';


import AppNavigator from './navigation/AppNavigator';
// import MusicNavigator from './navigation/MusicNavigator';

export default function App(props) {
  return (
    <Provider store={configureStore()}>
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
    backgroundColor: '#fff',
  },
});
