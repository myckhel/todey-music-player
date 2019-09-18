import React, { PureComponent } from 'react';
import { Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  PermissionsAndroid,
  DeviceEventEmitter,
  Button,
  TextInput,
  ScrollView,
  // Modal,
  // ActivityIndicator,``
  View,
} from 'react-native';
import { TopBar } from '../../components/TopBar';
import Item from '../../components/music/Item';
import color from '../../constants/Colors';
import {NavigationActions} from 'react-navigation';

import MusicFiles, { RNAndroidAudioStore } from 'react-native-get-music-files'
import Permissions from 'react-native-permissions'

import { setItem } from '../../func/app'

import Music from '../../func/music/Music'

import { loadMusics, loadingMusic, play } from "../../redux/actions";
import load from "../../func/music/load";
import { connect } from 'react-redux';

class SongsTab extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
       // refreshing: false,
      getAlbumsInput: "",
      getSongsInput: {},
      searchParam: "",
      paged: [],
      perPage: 10,
      currentPage: 0,
      tracks: [],
      artists: [],
      albums: [],
      songs: [],
      search: [],
      musics: props.musics,
      refreshing: props.loading,
      searchText: '',
      searchResults: [],
     }
   }

    componentWillUnmount(){
      DeviceEventEmitter.removeAllListeners();
    }

    componentDidMount = async () => {
      Permissions.checkMultiple(['storage'])
      .then((res) => {
        let perm;
        if (res.storage === 'authorized') {
          perm = res.storage
          this.init()
        } else {
          Permissions.request('storage')
          .then((perm) => {
            if (perm === 'authorized') {
              this.init()
            }
          })
          .catch((e) => {
            console.log(e);
          })
        }
      })

      // set search callback
      this.props.navigation.setParams({searchFunc: (search) => console.log(search)})

       DeviceEventEmitter.addListener(
         'onBatchReceived',
         (params) => {
           // console.log(params.batch);
           Music.add(params.batch)
           // this.props.loadingMusic(true)
           // this.props.loadMusics([...this.state.musics, ...params.batch])
           // this.props.loadingMusic(false)
         }
       )

       DeviceEventEmitter.addListener(
         'onLastBatchReceived',
         (params) => {
           // console.log(params);
             // this.setState()
               alert('last batch sent')
           }
       )
      // console.log(this.props.loadMusics);
      // console.log(this.state);
      // await this.loadMusic()
      // await this.startPlay()
    }

    filePermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE],
          {
            title: "We need storage permissions",
            message: "waiting",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonNeutral: "Accept",
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(granted, 'yes');
        } else {
          console.log(granted, PermissionsAndroid.RESULTS.GRANTED);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getAll = () => {
      MusicFiles.getAll({
        id: true,
        // blured: true, // works only when 'cover' is set to true
        artist: true,
        duration: true, //default : true
        cover: true, //default : true,
        genre: true,
        title: true,
        // fields: ['title', 'artwork', 'lyrics', 'duration', 'artist', 'genre', 'albumTitle'],
        // minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
        batchNumber : 1,
        // delay: 1000
      })
    };

    storeAll = () => {
      RNAndroidAudioStore.getAll({
        id: true,
        // blured: true, // works only when 'cover' is set to true
        artist: true,
        genre: true,
        title: true,
        cover: true, //default : true,
        coverFolder: '.covers',
        // coverResizeRatio: 2,
        // icon: true,
        // iconSize: 50,
        album: true,
        delay: 1000,
        // fields: ['title', 'artwork', 'lyrics', 'duration', 'artist', 'genre', 'albumTitle'],
        batchNumber : 50,
      })
    }

    init = async () => {
      try {
        setItem('songs', [])
        const songs =  setItem('songs').then((l) => {
          console.log(l);
        })
        console.log(songs);
        Promise.all([
          // this.getAll(),
          this.storeAll(),
          // this.getAlbums('Asa'),
          // this.getArtists(),
          // this.getSongs('Asa'),
          // this.search('Asa'),
        ])
      } catch (e) {
        console.log(e);
      }
    }

    getAlbums = (artist='') => {
      RNAndroidAudioStore.getAlbums({ artist : artist })
        .then(f => {
          console.log(f);
          this.setState({ ...this.state, albums: f });
        })
        .catch(er => console.log(er));
    };

    getArtists = () => {
      RNAndroidAudioStore.getArtists({})
        .then(f => {
          console.log(f);
          this.setState({ ...this.state, artists: f });
        })
        .catch(er => console.log(er));
    };

    getSongs = (artist = '', album = '') => {
      RNAndroidAudioStore.getSongs({ artist, album })
        .then(f => {
          console.log(f);
          this.setState({ ...this.state, songs: f });
        })
        .catch(er => console.log(er));
    };

    search = searchParam => {
      RNAndroidAudioStore.search({ searchParam })
        .then(f => {
          console.log(f);
          this.setState({ search: f });
        })
        .catch(er => console.log(er));
    };

   navigateToScreen = (route, params = {}) => {
     const navigateAction = NavigationActions.navigate({
       routeName: route,
       params
     });
     this.props.navigation.dispatch(navigateAction);
   }

   playSong = (song) => {
     this.props.play(song)
   }

   static getDerivedStateFromProps = (next, last) => {
     return {
       musics: next.musics,
       refreshing: next.loading
     }
   }

   onRefresh = () => {
     this.setState({refreshing: true})
     setTimeout(() => {
       this.setState(prev => ({musics: [...prev.musics], refreshing: false}))
     }, 2000)
   }

   render(){
    const { musics, playingProgress, paged } = this.state
    // console.log(Music)//.albums.search('black market'));
    // console.log(this.state);
    return (
      <ScrollView
      refreshControl={<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />}
      style={styles.containers}>
        <View style={styles.contentContainer}>
        {musics.map((item, i) => (
          <Item
          key={i}
            onPress={() => this.playSong(item)}
            rating={item.rating} index={i} artist={item.artist || item.author}
            title={item.title} cover={item.cover} fileName={item.fileName} style={{ }}
          />
        ))}
        </View>
        {/*<FlatList
          keyExtractor={(item, index) => `${index}`}
          data={musics}
          disableVirtualization={false}
          // maxToRenderPerBatch={15}
          // removeClippedSubviews={true}
          legacyImplementation={true}
          // initialNumToRender={20}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70*index,
            index,
          })}
          style={styles.containers}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (
            <Item
              onPress={() => this.playSong(item)}
              rating={item.rating} index={index} artist={item.artist || item.author}
              title={item.title} cover={item.cover} fileName={item.fileName} style={{ }}
            />
          )}
          contentContainerStyle={styles.contentContainer} />*/}
      </ScrollView>
    )

    playSong = (song) => {
      this.props.play(song)
    }
  }
}


const mapStateToProps = ({ music }) => {
	return { ...music };
};

export default connect(mapStateToProps,{ loadMusics, loadingMusic, play })(SongsTab);

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: color.alternative,
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
