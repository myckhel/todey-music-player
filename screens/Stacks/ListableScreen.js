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
 import Listable from '../../components/music/Listable';
 import color from '../../constants/Colors';

class ListableScreen extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
       lists: [],
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
     // console.log(last, next);
   }

   componentDidMount = async () => {
     const { getParam } = this.props.navigation
     const items = getParam('items')
     const type = getParam('type')
     if (items) {
       // get lisatble fields
       await this.setState({item: items, items: this.getListableFields(items, type)})
     }
   }

   getListableFields = (data, type) => {
     const lists = []
     lists.push({ title: `${data.title}'s Songs` })
     lists.push({ title: `${data.title}'s Albums` })
     lists.push({ title: `${data.title}'s Genres` })
     return lists
   }

   // getListableFields = (data) => {
   //   const lists = []
   //   const fields = ['albumCount', 'genreCount', 'artistCount', 'songCount', ]
   //   fields.map((field) => {
   //     if (data[field]) {
   //       lists.push({[field]: {
   //          "title": data[field],
   //        }})
   //     }
   //   })
   //   return lists
   // }

   render(){
    const { items } = this.state
    // console.log(items);
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={items}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (
            <Listable
              index={index}
              title={item.title} style={{ }} />)}
          contentContainerStyle={styles.contentContainer} />
      </View>
    )
  }
}

const mapStateToProps = ({  }) => {
	return {  };
};

export default connect(mapStateToProps,{  })(ListableScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // paddingTop: 30,
  },
});
