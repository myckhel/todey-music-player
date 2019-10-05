import React, { PureComponent }  from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

// import SplashScreen from "react-native-splash-screen";
// import {Toastify} from '../../func/helpers'

import { connect } from 'react-redux';
import { loadMusics } from '../../redux/actions'
import { getItem } from '../../func/app'

class AuthLoadingScreen extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isReady: false,
    };

    this._bootstrapAsync();
  }

  componentDidMount = () => {
    this.init()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
  };

  init = async () => {
    try {
      this.initMusic()
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate('App');
      // SplashScreen.hide();
    } catch (e) {
      console.log(e);
    }
  }

  initMusic = async () => {
    const songs = await getItem('songs')
    console.log(songs);
    if (songs && songs.length > 0) {
      this.props.loadMusics(songs)
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const mapStateToProps = () => {
	return {  };
};

export default connect(mapStateToProps,{ loadMusics })(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00C040",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 28
  }
})
