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
 import Artist from '../../components/music/Artist';
 import color from '../../constants/Colors';

 import {NavigationActions} from 'react-navigation';

class ArtistsTab extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
       ...props.artist,
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

   static getDerivedStateFromProps = (next, last) => {
     if (last !== next) {
       return {
         ...next.artist,
         refreshing: next.loading
       }
     }
     return null
     // console.log(last, next);
   }

   navigateToScreen = (route, params = {}) => {
     const navigateAction = NavigationActions.navigate({
       routeName: route,
       params
     });
     this.props.navigation.dispatch(navigateAction);
   }

   render(){
    const { authors } = this.state
    // console.log(this.state);
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={authors}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (
            <Artist
              onPress={() => this.navigateToScreen('Listable', {items: item, type: 'artist'})}
              genreCount={item.genreCount}
              rating={item.rating}
              index={index}
              albumCount={item.albumCount}
              songCount={item.musicCount}
              title={item.title}
              cover={item.cover}
              style={{ }} />
          )}
          contentContainerStyle={styles.contentContainer} />
      </View>
    )
  }
}


const mapStateToProps = ({ music }) => {
	return { artist: {...music.artist}, loading: music.loading };
};

export default connect(mapStateToProps,{  })(ArtistsTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
