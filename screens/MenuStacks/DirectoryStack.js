import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class DirectoryStack extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>Directory Stack</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default DirectoryStack;
