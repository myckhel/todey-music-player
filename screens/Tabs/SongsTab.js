import React, { PureComponent } from 'react';
import { Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  // Modal,
  // ActivityIndicator,``
  View,
 } from 'react-native';
 import { TopBar } from '../../components/TopBar';
 import Item, { NowPlaying } from '../../components/music/Item';
 import color from '../../constants/Colors';
 import {NavigationActions} from 'react-navigation';

// import { Audio, Asset } from 'expo';
//  import { FileSystem } from 'expo-file-system';
import { loadMusics, loadingMusic } from "../../redux/actions";
import load from "../../func/music/load";
import { connect } from 'react-redux';
// // import Permissions from 'react-native-permissions'
// import MediaLibrary from 'expo-media-library'

class SongsTab extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
       // refreshing: false,
       musics: props.musics,
       refreshing: props.loading
     }
   }

   componentWillMount = async () => {
     // console.log(this.props.loadMusics);
     // console.log(this.state);
     // await this.props.loadingMusic(true)
     // await this.props.loadMusics(load())
     // this.props.loadingMusic(false)
   }

   componentDidMount = async () => {
     // Permissions.request('storage')
     // .then((response) => {
     //   this.setState({permission: response})
     // })
     // .catch((e) => {
     //   console.log({e});
     // })
     // console.log(this.props.loadMusics);
     // console.log(this.state);
     await this.loadMusic()
     // await this.startPlay()
   }

   navigateToScreen = (route, params = {}) => {
     const navigateAction = NavigationActions.navigate({
       routeName: route,
       params
     });
     this.props.navigation.dispatch(navigateAction);
   }

   loadMusic = async () => {
     try {
       await this.props.loadingMusic(true)
       const musics = await load()
       // console.log(musics);
       await this.props.loadMusics( musics )
     } catch (e) {

     } finally {
       await this.props.loadingMusic(false)
     }
   }

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
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <FlatList
          shouldItemUpdate={(props,nextProps)=>
          { console.log(props,nextProps); return props.item!==nextProps.item}}
          keyExtractor={(item, index) => `${index}`}
          data={musics}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (<Item onPress={() => this.navigateToScreen('Listable', {items: item})} rating={item.rating} index={index} artist={item.artist} title={item.title} cover={item.cover} style={{ }} />)}
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
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
