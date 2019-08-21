import React, { PureComponent} from 'react';
import {
  // Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Slider,
  TouchableOpacity,
  View,
} from 'react-native';

import {NavigationActions} from 'react-navigation';

// components
import { TopBar } from '../../components/TopBar';
import color from '../../constants/Colors';
// assets

import { connect } from 'react-redux';
import { togglePlay } from "../../redux/actions";

// import MenuIcon from '../assets/images/primary_menu_icon.png';
// import SecondaryMenuIcon from '../assets/images/secondary_menu_icon.png';
import MusicNavigator from '../../navigation/MusicNavigator';
import { NowPlaying } from '../../components/music/Item';

class MusicScreen extends PureComponent {
  constructor(props){
    super(props)

    this.state = {
      playing: true,
      paused: false,
      collapsedPlay: false,
      playingProgress:{
        elapsed: 1.24,//(1.5 / 3) * 100,
        remaining: 3 - 1.5,//100 - ((1.53) * 100),
        total: 3
      },
    }
  }

   navigateToScreen = (route, params = {}) => {
     const navigateAction = NavigationActions.navigate({
       routeName: route,
       params
     });
     this.props.navigation.dispatch(navigateAction);
   }

   toggleCollapsedPlay = () => {
     this.setState(prev => ({collapsedPlay: !prev.collapsedPlay}))
   }

   startPlay = async () => {
     // this.playingTimer = await setInterval(() => {
     //   this.setState(state=> ({
     //     playingProgress: {
     //       ...state.playingProgress,
     //       elapsed: Math.min((state.playingProgress.elapsed + 0.01).toFixed(2), state.playingProgress.total)
     //     }
     //   }))
     // }, 1000)
     console.log('playing');
   }

   stopPlay = () => {
     // clearInterval(this.playingTimer)
     // this.setState({started: false})
     console.log('stop');
   }

  // togglePlay = () => {
  //   if (this.state.paused) {
  //     this.startPlay()
  //   } else {
  //     this.stopPlay()
  //   }
  //   this.setState(prev => ({paused: !prev.paused}))
  // }

  render() {
    const { playingProgress, playing, paused, music} = this.props
    const { cover, author, title, duration  } = this.props.music
    // console.log({ playingProgress, playing, paused, music});
    return (
      <View style={styles.container}>
        <MusicNavigator />
        {this.state.playing &&
          this.state.collapsedPlay ? (
            <View style={styles.circlePlayIcon}>
              <></>
            </View>
          ) :
          (<View style={styles.playingContainer}>
            {/*<View style={{flexDirection: 'row'}}>
              <View style={[styles.playingElapsed, {width: `${this.state.playingProgress.elapsed}%`}]}></View>
              <View style={[styles.playingPoint, ]}></View>
              <View style={[styles.playingRemaining, {width: `${this.state.playingProgress.remaining}%`}]}></View>
            </View>*/}
            <Slider
              onValueChange={(d) => this.setState(state=>({
                playingProgress: {...state.playingProgress, elapsed: d.toFixed(2)}
              }))}
              style={{width: '100%', height: 10, position: 'absolute', top: 0, marginTop: -3}}
              minimumValue={0}
              maximumValue={this.state.playingProgress.total}
              value={this.state.playingProgress.elapsed}
              minimumTrackTintColor={color.primary}
              maximumTrackTintColor='rgba(255,255,255,0.5)'
            />

          {playing && <NowPlaying
            togglePlay={ () => this.props.togglePlay()}
            title={title}
            playing={playing}
            paused={paused}
            cover={cover}
            onPress={() => {this.navigateToScreen('Playing')}}
            style={{ }}
            duration={duration}
            elapsed={playingProgress.elapsed}
            artist={author}
          />}
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ music }) => {
  const { playing } = music
	return { ...playing };
};

export default connect(mapStateToProps,{ togglePlay })(MusicScreen);

// HomeScreen.navigationOptions = {
//   title: 'Home',
//   header: <TopBar />,
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  playingContainer: {
    width: '100%',
    // height: 100,
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  playingElapsed: {
    height: 3,
    width: '10%',
    backgroundColor: color.primary,
  },
  playingRemaining: {
    zIndex: -1,
    width: 50,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: -5,
  },
  playingPoint: {
    width: 10,
    height: 10,
    backgroundColor: color.primary,
    borderRadius: 5,
    marginLeft: -5,
    marginTop: -3
  },
  collapsedPlay: {
    marginLeft: 'auto',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: color.primary
  },
  circlePlayIcon: {
    borderRadius: 25,
    marginLeft: 'auto',
    width: 50,
    height: 50,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
