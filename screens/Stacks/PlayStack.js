import React, { PureComponent } from 'react';
import { Text,
  StyleSheet,
  TouchableOpacity,
  View,
 } from 'react-native';
 import { connect } from 'react-redux';
 import color from '../../constants/Colors';

class Play extends PureComponent {
   constructor(props){
     super(props)

     this.state = {
     }
   }

   componentWillMount = () => {
    // console.log('artist');
   }

   componentWillReceiveProps = (next, last) => {
     if (last !== next) {
       this.setState(prev => ({
       }))
     }
     // console.log(last, next);
   }

   componentDidMount = async () => {
   }

   render(){
    const { items } = this.state
    // console.log(items);
    return (
      <View style={styles.container}>
        <Text>Play</Text>
      </View>
    )
  }
}

const mapStateToProps = ({  }) => {
	return {  };
};

export default connect(mapStateToProps,{  })(Play);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
