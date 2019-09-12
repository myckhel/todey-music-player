import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Item from './Item'
import TabBarIconI, { TabBarIconE, TabBarIconM } from '../../components/TabBarIcon';

const Meta = ({songCount, genreCount}) => {
  return (
    <>
      <View style={styles.metaItem}>
        <TabBarIconE name="music" style={[styles.metaIcon]} />
        <Text style={styles.metaText}>{songCount}</Text>
      </View>
      <View style={styles.metaItem}>
        <TabBarIconE name="creative-commons-attribution" style={[styles.metaIcon]} />
        <Text style={styles.metaText}>{genreCount}</Text>
      </View>
    </>
  )
}

export default ({index, title, cover, songCount, genreCount, rating, artist}) => {
  return (
    <Item
      index={index}
      rating={rating}
      artist={artist}
      Meta={({style}) => <Meta
        style={style}
        songCount={songCount} genreCount={genreCount} />}
        title={title} cover={cover} style={{ }} type="album" />
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
