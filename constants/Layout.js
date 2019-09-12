import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  text: {
    small: 10,
    medium: 13,
    big: 10,
    large: 10,
  },
  verticalMargin: 5,
  horizontalMargin: 5,
};
