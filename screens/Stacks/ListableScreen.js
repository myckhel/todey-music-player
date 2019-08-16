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

   componentWillMount = () => {
    // console.log('artist');
   }

   componentWillReceiveProps = (next, last) => {
     if (last !== next) {
       this.setState(prev => ({
         ...next.artist,
         refreshing: next.loading
       }))
     }
     // console.log(last, next);
   }

   componentDidMount = async () => {
     if (this.props.navigation.state.params) {
       const items = this.props.navigation.getParam('items')
       // get lisatble fields
       await this.setState({items: this.getListableFields(items)})
       console.log(this.state);
     }
     console.log(this.props);
   }

   getListableFields = (data) => {
     const lists = []
     const fields = ['albumCount', 'genreCount', 'artistCount', 'songCount', ]
     fields.map((field) => {
       if (data[field]) {
         lists.push({[field]: {
            "title": data[field],
          }})
       }
     })
     return lists
   }

   render(){
    const { items } = this.state
    // console.log(items);
    return (
      <View style={styles.container}>
        <FlatList
          shouldItemUpdate={(props,nextProps)=>
          { console.log(props,nextProps); return props.item!==nextProps.item}}
          keyExtractor={(item, index) => `${index}`}
          data={items}
          disableVirtualization={false}
          initialNumToRender={30}
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderItem={({item, index}) => (<Listable index={index} title={item.title} style={{ }} />)}
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
