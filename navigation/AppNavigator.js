import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoading from '../screens/Auth/AuthLoading';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    AuthLoading,
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    App: MainTabNavigator,
  })
);
