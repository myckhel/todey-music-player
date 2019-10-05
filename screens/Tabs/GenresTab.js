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
 import Genre from '../../components/music/Genre';
 import color from '../../constants/Colors';

class GenresTab extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
       ...props.genre,
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
     if (s.genres !== p.genre.genres || p.loading !== s.refreshing) {
       return {
         ...p.genre,
         refreshing: p.loading
       }
     }
     return
   }

   Genre = ({item, index}) => (
     <Genre
        rating={item.rating} index={index}
        albumCount={item.albumCount}
        songCount={item.musicCount} title={item.title}
        cover={item.cover} style={{ }} />
   )

   render(){
    const { genres } = this.state
    // console.log(albums);
    return (
      <View style={styles.container}>
        <FlatList
          shouldItemUpdate={(props,nextProps)=>
          { console.log(props,nextProps); return props.item!==nextProps.item}}
          keyExtractor={(item, index) => `${index}`}
          data={genres}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={this.Genre}
          contentContainerStyle={styles.contentContainer} />
      </View>
    )
  }
}


const mapStateToProps = ({ music }) => {
	return { genre: {...music.genre}, loading: music.loading };
};

export default connect(mapStateToProps,{  })(GenresTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
