import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native'
export const setItem = async (name, item) => {
  return AsyncStorage.setItem(name, JSON.stringify(item))
}

export const getItem = async (name) => {
  return AsyncStorage.getItem(name)
}

window.merge = (state, newState) => {
  return Object.assign({}, state, newState)
}

window.setStorageItem = async (index, item) => {
  try {
    let storageItem = await getStorageItem(index)
    if (storageItem) {
      storageItem = merge(storageItem, item)
    } else {
      storageItem = item
    }
    await AsyncStorage.setItem(
      index,
      JSON.stringify(storageItem)
    );
  } catch (e) {
    console.log(e);
  }
}
export const setStorageItem = window.setStorageItem

export const getStorageItem = async (index) => {
  return await JSON.parse(await AsyncStorage.getItem(index));
  // return data
}

// export const Toastify = (message) => {
//   Toast.show(message, {
//     duration: Toast.durations.LONG,
//     position: Toast.positions.BOTTOM,
//     shadow: true,
//     animation: true,
//     hideOnPress: true,
//     delay: 0
//   });
// }

export const confirm = (warning = '') => {
  return new Promise(function(resolve, reject) {
    Alert.alert(
      "Confirm", warning, [
        {
          text: "No",
          onPress: () => resolve(false),
          style: "cancel"
        },
        { text: "Yes", onPress: () => resolve(true) }
      ],
      { cancelable: false }
    );
  });
}

export const getProp = (obj, path) => {
  var schema = obj;  // a moving reference to internal objects within obj
  var pList = path.split('.');
  var len = pList.length;
  for(var i = 0; i < len-1; i++) {
      var elem = pList[i];
      if( !schema[elem] ){
        schema=null
        break;
      } else {
        schema = schema[elem];
      } //schema[elem] = {}
  }
  if (schema[pList[len-1]]) {
    return {uri: schema[pList[len-1]]}
  } else {
    return null
  }
  // console.log();
}

window.isCloseToBottom = (({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
})
