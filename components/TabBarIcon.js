import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';

export default function TabBarIconI({focused, style, name, size}) {
  return (
    <Ionicons
      name={name}
      size={size || (style && style.width) || 26}
      style={[{ marginBottom: -3 }, style]}
      color={focused ? Colors.black : Colors.black}
    />
  );
}

export function TabBarIconE({focused, style, name, size }) {
  return (
    <Entypo
      name={name}
      size={ size || (style && style.width) || 26}
      style={[{ marginBottom: -3 }, style]}
      color={focused ? Colors.black : Colors.black}
    />
  );
}

export function TabBarIconM({focused, style, name, size }) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={ size || (style && style.width) || 26}
      style={[{ marginBottom: -3 }, style]}
      color={focused ? Colors.black : Colors.black}
    />
  );
}
