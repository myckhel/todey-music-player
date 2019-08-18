import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
console.log(Entypo);
import Colors from '../constants/Colors';

export default function TabBarIconI(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={[{ marginBottom: -3 }, props.style]}
      color={props.focused ? Colors.black : Colors.black}
    />
  );
}

export function TabBarIconE(props) {
  return (
    <Entypo
      name={props.name}
      size={26}
      style={[{ marginBottom: -3 }, props.style]}
      color={props.focused ? Colors.black : Colors.black}
    />
  );
}

export function TabBarIconM(props) {
  return (
    <MaterialCommunityIcons
      name={props.name}
      size={26}
      style={[{ marginBottom: -3 }, props.style]}
      color={props.focused ? Colors.black : Colors.black}
    />
  );
}
