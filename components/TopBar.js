import React, { PureComponent } from 'react';
// const { StatusBarManager } = NativeModules;
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import Popover from "react-native-popover-view";
import TabBarIconI, { TabBarIconE, TabBarIconM } from '../components/TabBarIcon';
import color from '../constants/Colors';

export class TopBar extends PureComponent {
  constructor(props){
    super(props)

    this.state = {
      search: '',
      searching: false,
      showPopover: false,
    }
  }

  toggleSearch = () => {
    this.setState(prev => ({searching: !prev.searching}))
  }

  POver = () =>
    <Popover
      isVisible={this.state.showPopover}
      fromView={this.touchable}
      placement="bottom"
      onRequestClose={() => {
        this.setState({ showPopover: false });
      }}
    >
      <PopoverWrapper canMark={true} />
    </Popover>

  render = () => {
    const { navigation, title } = this.props
    const { search, searching } = this.state
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{}}>
          <TabBarIconI name="ios-menu" style={[styles.menu]} />
        </TouchableOpacity>
        {searching
        ? <TextInput
            autoFocus={true}
            style={styles.search}
            placeholder='Search'
            value={search}
            onChangeText={(search) => {console.log(search);this.setState({search})}}
          />
        :<View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.headerText}>{title ? title : 'Todey Player'}</Text>
        </View>}
        <TouchableOpacity onPress={() => this.toggleSearch()} style={styles.secondaryMenu}>
          <TabBarIconI name="md-search" style={[styles.menu]} />
        </TouchableOpacity>
        <TouchableOpacity
          ref={ref => (this.touchable = ref)}
          onPress={() => this.setState({ showPopover: true })} 
          style={styles.secondaryMenu}>
          <TabBarIconE name="dots-three-vertical" style={[styles.menu]} />
        </TouchableOpacity>
        <this.POver />
      </View>
    )
  }
}

const PopoverWrapper = ({canMark, spinner, onMark}) => {
  return (
    <>
      {/*<ActivityIndicator visible={spinner} textStyle={styles.spinnerTextStyle} />*/}
      <View style={styles.popContainer}>
        {canMark && (
          <TouchableOpacity style={styles.item} onPress={onMark}>
            <Text style={styles.itemText}>Mark / Unmark All</Text>
          </TouchableOpacity>
        )}
        {<TouchableOpacity style={styles.item} onPress={()=>{}}>
          <Text style={styles.itemText}>Sort</Text>
        </TouchableOpacity>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: StatusBar.currentHeight,
    backgroundColor: color.primary,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: color.primary,
    paddingVertical: 10,
  },
  primaryMenu: {
    // position: 'absolute',
    // left: 0
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'space-mono',
    fontWeight: 'bold',
    color: color.black,
    textAlign: 'center',
  },
  secondaryMenu: {
    // position: 'absolute',
    // right: 0
  },
  menu: {
    padding: 5,
    marginHorizontal: 9,
    marginVertical: 5,
    color: color.black
  },
  search: {
    justifyContent: 'center',
    flex: 1
  },
  popContainer: {
    // width: 200
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "rgba(230,230,230,0.4)",
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  itemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    color: "#78849E"
  }
})
