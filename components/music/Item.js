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
import Popover from "react-native-popover-view";

import TabBarIconI, { TabBarIconE, TabBarIconM } from '../../components/TabBarIcon';
// import { Ionicons, Entypo } from '@expo/vector-icons';
import color from '../../constants/Colors';
import layout from '../../constants/Layout';

export default class Item extends PureComponent {
  constructor(props){
    super(props)

    this.state = {
      showPopover: false,
    }
  }

  RenderPlaceholder = () => {
    const { type } = this.props
    switch (type) {
      case 'artist':
        return <TabBarIconM name={'artist'} style={styles.img} />
        break;
      case 'album':
        return <TabBarIconM name={'album'} style={styles.img} />
        break;
      case 'genre':
        return <TabBarIconE name={'creative-commons-attribution'} style={styles.img} />
        break;
      default:
        return <TabBarIconE name="music" style={styles.img} />
    }
  }

  POver = () =>
    <Popover
      isVisible={this.state.showPopover}
      fromView={this.touchable}
      placement="bottom"
      onRequestClose={() => {
        this.setState({ showPopover: false });
      }}
    >
      <PopoverWrapper canMark={true} />
    </Popover>

  render (){
    const {cover, icon, path, index, onPress, title, artist, author, paused, fileName, playing, togglePlay, Meta, rating} = this.props
    // let src = require(`../../assets/images/covers/Asa.jpg`)

    return (
      <TouchableOpacity
        onPress={() => typeof onPress === 'function' && onPress()}
        style={styles.container}>
        <View style={styles.imgWrapper}>
        {typeof cover === "function" ? (
          cover({style: styles.img})
        ) : (icon || cover)
        ? (
          <FastImage
            style={styles.img}
            source={{uri: icon || cover}} />
        )
        : <this.RenderPlaceholder />}
        </View>
        <View style={styles.overview}>
          {/*<View></View>*/}
          <Text style={styles.title}>{title} {(artist || author || fileName) && <Text style={styles.artist}> {` - ${artist || author || fileName}`}</Text>}</Text>
          <View style={styles.metaContainer}>
          {typeof Meta === 'function' && (<Meta style={styles.metaItem} />)}
            <View style={styles.metaItem}>
              <TabBarIconM size={17} name="playlist-play" style={[styles.metaIcon]} />
              <Text style={styles.metaText}>{15}</Text>
            </View>
            <View style={styles.metaItem}>
              <TabBarIconI size={17} name="md-star-half" style={[styles.metaIcon]} />
              <Text style={styles.metaText}>{rating}</Text>
            </View>
          </View>
          {/*<View></View>*/}
        </View>
        <TouchableOpacity
          ref={ref => (this.touchable = ref)}
          onPress={() => this.setState({ showPopover: true })}
          style={styles.primaryMenu}>
          <TabBarIconE name="dots-three-vertical" size={15} style={[styles.menu]} />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <this.POver />
      </TouchableOpacity>
    )
  }
}

export const NowPlaying = ({src, title, artist, author, fileName, togglePlay, paused, elapsed, onPress, cover}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.container} >
      <View style={styles.imgWrapper}>
      {cover
        ? <FastImage
          style={styles.img}
          source={{uri: cover}} />
        : <TabBarIconE name="music" style={styles.img} />
      }
      </View>
      <View style={styles.overview}>
        {/*<View></View>*/}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist || author || fileName}</Text>
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
    </TouchableOpacity>
  );
}

const PopoverWrapper = ({canMark, spinner, onMark}) => {
  return (
    <>
      <View style={styles.popContainer}>
        {canMark && (
          <TouchableOpacity style={styles.item} onPress={onMark}>
            <Text style={styles.itemText}>Mark / Unmark</Text>
          </TouchableOpacity>
        )}
        {<TouchableOpacity style={styles.item} onPress={()=>{}}>
          <Text style={styles.itemText}>Append</Text>
        </TouchableOpacity>}
        {<TouchableOpacity style={styles.item} onPress={()=>{}}>
          <Text style={styles.itemText}>Add To</Text>
        </TouchableOpacity>}
        {<TouchableOpacity style={styles.item} onPress={()=>{}}>
          <Text style={styles.itemText}>Play View</Text>
        </TouchableOpacity>}
        {<TouchableOpacity style={styles.item} onPress={()=>{}}>
          <Text style={styles.itemText}>Information</Text>
        </TouchableOpacity>}
        {<TouchableOpacity style={styles.item} onPress={()=>{}}>
          <TabBarIconI name="md-star" style={[styles.metaIcon]} />
          <TabBarIconI name="md-star" style={[styles.metaIcon]} />
          <TabBarIconI name="md-star" style={[styles.metaIcon]} />
          <TabBarIconI name="md-star" style={[styles.metaIcon]} />
          <TabBarIconI name="md-star" style={[styles.metaIcon]} />
        </TouchableOpacity>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.horizontalMargin,
    padding: 5,
    width: Layout.window.width - 10,
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
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
    width: layout.window.width - (5 + 5 + 50 + 5 + 10 + 50),
    // height: 2,
    position: 'absolute',
    bottom: 0,
    marginLeft: 5 + 5 + 50 + 5,
    // flexWrap: 'wrap',
    // alignSelf: 'flex-end'
  },
  title: {
    fontSize: Layout.text.medium,
    paddingHorizontal: 5,
    color: color.secondary,
  },
  artist: {
    paddingHorizontal: 5,
    fontStyle: 'italic',
    color: color.secondary,
  },
  metaContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  metaItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {

  },
  metaText: {
    fontSize: Layout.text.small,
    color: color.secondary,
    // alignSelf: 'flex-end'
  },
  primaryMenu: {
    alignItems: 'center',
    // alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  menu: {
    // padding: 5,
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
    color: color.secondary,
  },
  popContainer: {
    // width: 200
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "rgba(230,230,230,0.4)",
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  itemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    // color: "#78849E",
    color: color.secondary,
  }
})
