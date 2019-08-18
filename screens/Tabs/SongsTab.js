import React, { PureComponent } from 'react';
import { Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  // PermissionsAndroid,
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

 import MusicFiles from 'react-native-get-music-files'
 import Permissions from 'react-native-permissions'

import { loadMusics, loadingMusic } from "../../redux/actions";
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
      tracks: [],
      artists: [],
      albums: [],
      songs: [],
      search: [],
      musics: props.musics,
      refreshing: props.loading
     }
   }

    componentWillUnmount(){
      DeviceEventEmitter.removeAllListeners();
    }

    componentDidMount = async () => {
      try {
        const perm = await this.askPermission()
        if (perm === 'authorized') {
          this.getAll()
        }
      } catch (e) {
        console.log(e);
      }

       DeviceEventEmitter.addListener(
         'onBatchReceived',
         async (params) => {
           // alert(JSON.stringify(params.batch))
           console.log(params);
           try {
             await this.props.loadingMusic(true)
             await this.props.loadMusics([...this.state.musics, ...params.batch])
           } catch (e) {
              console.log(e);
           } finally {
             await this.props.loadingMusic(false)
           }
           // this.setState(prev =>({ musics: [...prev.musics, ...params.batch] }))
         }
       )

       DeviceEventEmitter.addListener(
         'onLastBatchReceived',
         (params) => {
           console.log(params);
             this.setState(alert('last batch sent'));
           }
       )
      // console.log(this.props.loadMusics);
      // console.log(this.state);
      // await this.loadMusic()
      // await this.startPlay()
    }

    getAll = () => {
      MusicFiles.getAll({
        blured: true, // works only when 'cover' is set to true
        artist: true,
        duration: true, //default : true
        cover: true, //default : true,
        genre: true,
        title: true,
        fields: ['title', 'artwork', 'lyrics', 'duration', 'artist', 'genre', 'albumTitle'],
        // minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
        batchNumber : 5,
        // delay: 1000
      })
      .then((r) => {
        alert(JSON.stringify(r))
        console.log(r);
      })
      .catch(er => alert(JSON.stringify(error)));
    };

    // requestPermission = async () => {
    //    try {
    //      const granted = await PermissionsAndroid.requestMultiple(
    //        [
    //          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    //        ],
    //        {
    //          title: "Permission",
    //          message: "Storage access is requiered",
    //          buttonPositive: "OK"
    //        }
    //      );
    //      alert(JSON.stringify(granted), PermissionsAndroid.RESULTS.GRANTED);
    //      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //        alert("You can use the package");
    //      } else {
    //        // this.requestPermission();
    //      }
    //    } catch (err) {
    //      console.warn(err);
    //    }
    //  };

   askPermission = async () => {
     return new Promise(function(resolve, reject) {
       Permissions.request('storage')
       .then((response) => {
         // this.setState({permission: response})
         resolve(response);
       })
       .catch((e) => {
         reject(e);
       })
     });
   }

   navigateToScreen = (route, params = {}) => {
     const navigateAction = NavigationActions.navigate({
       routeName: route,
       params
     });
     this.props.navigation.dispatch(navigateAction);
   }

   // loadMusic = async () => {
   //   try {
   //     await this.props.loadingMusic(true)
   //     // const musics = await load()
   //     await this.music()
   //     // console.log(musics);
   //     await this.props.loadMusics( musics )
   //   } catch (e) {
   //     console.log(e);
   //   } finally {
   //     await this.props.loadingMusic(false)
   //   }
   // }

   // music = async () => {
   //   try {
   //     Permissions.request('storage')
   //     .then(async (res) => {
   //       console.log(res);
   //       if (res) {
   //         MusicFiles.getAll({
   //           id: true,
   //           blured: true,
   //           artist: true,
   //           duration: true,
   //           cover: true,
   //           title: true,
   //           batchNumber: 5,
   //           minimumSongDuration: 10000,
   //           fields: ['title', 'artwork', 'lyrics', 'duration', 'artist', 'genre', 'albumTitle']
   //         })
   //         .then((ms) => {
   //           console.log(ms);
   //         })
   //         .catch((e) => {
   //           console.log(e);
   //         })
   //       }
   //    })
   //   } catch (e) {
   //
   //   }
   // }

   componentWillReceiveProps = (next, last) => {
     if (last !== next) {
       this.setState(prev => ({
         musics: next.musics,
         refreshing: next.loading
       }))
     }
     // console.log(last, next);
   }

   onRefresh = () => {
     this.setState({refreshing: true})
     setTimeout(() => {
       this.setState(prev => ({musics: [...prev.musics], refreshing: false}))
     }, 2000)
   }

   render(){
    const { musics, playingProgress } = this.state
    console.log(this.state);
    return (
      <View style={styles.containers}>
        <FlatList
          shouldItemUpdate={(props,nextProps)=>
          { console.log(props,nextProps); return props.item!==nextProps.item}}
          keyExtractor={(item, index) => `${index}`}
          data={musics}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.containers}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (<Item onPress={() => this.navigateToScreen('Listable', {items: item})} rating={item.rating} index={index} artist={item.artist || item.author} title={item.title} cover={item.cover} style={{ }} />)}
          contentContainerStyle={styles.contentContainer} />
      </View>
    )
  }
}


const mapStateToProps = ({ music }) => {
	return { ...music };
};

export default connect(mapStateToProps,{ loadMusics, loadingMusic })(SongsTab);

// {musics.map()}
// {marginLeft: `${this.state.playingProgress}%`}

// SettingsScreen.navigationOptions = {
//   title: '',
// };

// SongsTab.navigationOptions = {
//   title: 'Songs',
//   header: <TopBar />,
// }
const styles = StyleSheet.create({
  containers: {
    flex: 1,
    // backgroundColor: '#000',
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
