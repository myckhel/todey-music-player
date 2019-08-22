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
 import { connect } from 'react-redux';

 import { TopBar } from '../../components/TopBar';
 import Album from '../../components/music/Album';
 import color from '../../constants/Colors';

// import { Audio, Asset } from 'expo';
//  import { FileSystem } from 'expo-file-system';
// import artist from "../../func/music/artist";

class AlbumsTab extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
       ...props.album,
       refreshing: props.loading,
       musics: []
     }
   }

   onRefresh = () => {
     this.setState({refreshing: true})
     setTimeout(() => {
       this.setState(prev => ({musics: [...prev.musics], refreshing: false}))
     }, 2000)
   }

   // componentWillMount = () => {
    // console.log('artist');
   // }

   static getDerivedStateFromProps = (next, last) => {
     if (last !== next) {
       // this.setState(prev => (
       return {
         ...next.album,
         refreshing: next.loading
       }
       // }))
     }
     return null
     // console.log(last, next);
   }

   render(){
    const { albums } = this.state
    // console.log(albums);
    return (
      <View style={styles.container}>
        <FlatList
          shouldItemUpdate={(props,nextProps)=>
          { console.log(props,nextProps); return props.item!==nextProps.item}}
          keyExtractor={(item, index) => `${index}`}
          data={albums}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (<Album artist={item.artist} rating={item.rating} index={index} genreCount={item.genreCount} songCount={item.musicCount} title={item.title} cover={item.cover} style={{ }} />)}
          contentContainerStyle={styles.contentContainer} />
      </View>
    )
  }
}


const mapStateToProps = ({ music }) => {
	return { album: {...music.album}, loading: music.loading };
};

export default connect(mapStateToProps,{  })(AlbumsTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
