import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Item from './Item'
import TabBarIconI, { TabBarIconE, TabBarIconM } from '../../components/TabBarIcon';

const Meta = ({songCount, albumCount}) => {
  return (
    <>
      <View style={styles.metaItem}>
        <TabBarIconE name="music" style={[styles.metaIcon]} />
        <Text style={styles.metaText}>{songCount}</Text>
      </View>
      <View style={styles.metaItem}>
        <TabBarIconM name="album" style={[styles.metaIcon]} />
        <Text style={styles.metaText}>{albumCount}</Text>
      </View>
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
        albumCount={albumCount}
        songCount={songCount} />}
      title={title} cover={cover} style={{ }} type="genre" />
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
