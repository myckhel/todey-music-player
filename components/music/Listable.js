import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Item from './Item'
import TabBarIconI, { TabBarIconE, TabBarIconM } from '../../components/TabBarIcon';

const Meta = ({songCount, albumCount}) => {
  return (
    <>

    </>
  )
}

export default ({index, title, cover, songCount, rating, albumCount}) => {
  return (
    <Item
      index={index}
      rating={rating}
      Meta={({style}) => <Meta
        style={style}
        songCount={songCount} />}
      title={title}
      cover={({style}) => <TabBarIconE name="music" style={[style]} />}
      style={{ }} />
  )
}

const styles = StyleSheet.create({
  metaContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {

  },
  metaText: {
    alignSelf: 'flex-end'
  }
})
