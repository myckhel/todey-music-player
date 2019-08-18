import React, { PureComponent } from 'react';
// const { StatusBarManager } = NativeModules;
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image'

import TabBarIconI, { TabBarIconE, TabBarIconM } from '../../components/TabBarIcon';
// import { Ionicons, Entypo } from '@expo/vector-icons';
import color from '../../constants/Colors';
import layout from '../../constants/Layout';

export default class Item extends PureComponent {
  constructor(props){
    super(props)
  }
  render (){
    const {cover, path, index, onPress, title, artist, author, paused, playing, togglePlay, Meta, rating} = this.props

    let src = require(`../../assets/images/covers/Asa.jpg`)

    return (
      <TouchableOpacity
        onPress={() => typeof onPress === 'function' && onPress()}
        style={styles.container}>
        <View style={styles.imgWrapper}>
        {typeof cover === "function" ? (
          cover()
        ) : (
          <FastImage
            style={styles.img}
            source={cover ? {uri: cover} : src} />
        )}
        </View>
        <View style={styles.overview}>
          {/*<View></View>*/}
          <Text style={styles.title}>{title} {(artist || author) && <Text style={styles.artist}> - {artist || author}</Text>}</Text>
          <View style={styles.metaContainer}>
          {typeof Meta === 'function' && (<Meta style={styles.metaItem} />)}
            <View style={styles.metaItem}>
              <TabBarIconM name="playlist-play" style={[styles.metaIcon]} />
              <Text style={styles.metaText}>{15}</Text>
            </View>
            <View style={styles.metaItem}>
              <TabBarIconI name="md-star-half" style={[styles.metaIcon]} />
              <Text style={styles.metaText}>{rating}</Text>
            </View>
          </View>
          {/*<View></View>*/}
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.primaryMenu}>
          <TabBarIconE name="dots-three-vertical" style={[styles.menu]} />
        </TouchableOpacity>
        <View style={styles.separator}></View>
      </TouchableOpacity>
    )
  }
}

export const NowPlaying = ({src, title, artist, author, togglePlay, paused, elapsed}) => {
  src = require(`../../assets/images/covers/AKON.jpg`)
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          style={styles.img}
          source={src} />
      </View>
      <View style={styles.overview}>
        {/*<View></View>*/}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist || author}</Text>
        {/*<View></View>*/}
      </View>
      <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
        <View style={[styles.playingRatio]}>
          <Text>{`${elapsed}`}</Text>
        </View>
        <TouchableOpacity onPress={() => {togglePlay()}} style={styles.primaryMenu}>
          <TabBarIconI name={paused ? "md-play" : "md-pause"} style={styles.playIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    width: layout.window.width - 10,
    // height: layout.window.height - 10,
    // flex: 1,
    flexDirection: 'row',
    // alignSelf: 'stretch',
    // backgroundColor: 'blue'
  },
  imgWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: color.primary
  },
  img: {
    width: 50,
    height: 50
  },
  overview: {
    marginHorizontal: 5,
    // flexDirection: 'column',
    // backgroundColor: 'blue'
    // alignItems: 'stretch'
  },
  separator: {
    borderBottomWidth: 3,
    borderBottomColor: color.primary,
    width: layout.window.width - (5 + 5 + 50 + 5 + 10 + 50),
    height: 2,
    position: 'absolute',
    bottom: 0,
    marginLeft: 5 + 5 + 50 + 5,
    // flexWrap: 'wrap',
    // alignSelf: 'flex-end'
  },
  title: {
    paddingHorizontal: 5,
  },
  artist: {
    paddingHorizontal: 5,
    fontStyle: 'italic',
  },
  metaContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {

  },
  metaText: {
    alignSelf: 'flex-end'
  },
  primaryMenu: {
    // alignSelf: 'flex-end',
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  menu: {
    padding: 5,
    marginHorizontal: 9,
    marginVertical: 5,
    color: color.black
  },
  playIcon: {
    padding: 5,
    marginHorizontal: 9,
    marginVertical: 5,
    color: color.black,
    // width: 80, height: 80
  },
  playingRatio: {
    backgroundColor: color.primary,
    padding: 5,
    marginTop: 'auto',
  }
})
