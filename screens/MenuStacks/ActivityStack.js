import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class ActivityStack extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>Activity Stack</Text>
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

export default ActivityStack;
