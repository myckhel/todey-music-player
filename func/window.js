import { NavigationActions } from 'react-navigation';

window.color = require("../constants/Colors").default
window.Layout = require("../constants/Layout").default

let _navigator;

window.setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
}

window.navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

window.getParam = (screenObj, name) => {
  return screenObj.props.navigation.getParam(name)
}

window.didFocusSub = (screenObj, callback) => {
  const didFocusSub = screenObj.props.navigation.addListener(
    'didFocus',
    () => callback()
  )
  screenObj.didFocusSub = didFocusSub
  return didFocusSub
}

window.goBack = (screenObj) => {
  return screenObj.props.navigation.goBack()
}

window.capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  i: 'i',
}
