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

   static getDerivedStateFromProps = (p, s) => {
     if (s.albums !== p.album.albums || p.loading !== s.refreshing) {
       return {
         ...p.album,
         refreshing: p.loading
       }
     }
     return null
   }

   Album = ({item, index}) => (
     <Album
      artist={item.artist}
      rating={item.rating} index={index}
      genreCount={item.genreCount}
      songCount={item.musicCount}
      title={item.title} cover={item.cover}
      style={{ }} />
   )

   render(){
    const { albums } = this.state
    // console.log(albums);
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={albums}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={this.Album}
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
