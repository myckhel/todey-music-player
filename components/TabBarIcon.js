import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
console.log(Entypo);
import Colors from '../constants/Colors';

export default function TabBarIconI({focused, style, name, }) {
  return (
    <Ionicons
      name={name}
      size={(style && style.width) || 26}
      style={[{ marginBottom: -3 }, style]}
      color={focused ? Colors.black : Colors.black}
    />
  );
}

export function TabBarIconE({focused, style, name, }) {
  return (
    <Entypo
      name={name}
      size={(style && style.width) || 26}
      style={[{ marginBottom: -3 }, style]}
      color={focused ? Colors.black : Colors.black}
    />
  );
}

export function TabBarIconM({focused, style, name, }) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={(style && style.width) || 26}
      style={[{ marginBottom: -3 }, style]}
      color={focused ? Colors.black : Colors.black}
    />
  );
}
