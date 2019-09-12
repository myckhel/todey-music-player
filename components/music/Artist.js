import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Item from './Item'
import TabBarIconI, { TabBarIconE, TabBarIconM } from '../../components/TabBarIcon';

const Meta = ({songCount, albumCount, genreCount}) => {
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
      <View style={styles.metaItem}>
        <TabBarIconE name="creative-commons-attribution" style={[styles.metaIcon]} />
        <Text style={styles.metaText}>{genreCount}</Text>
      </View>
    </>
  )
}

export default ({onPress, index, title, cover, songCount, albumCount, rating, genreCount}) => {
  return (
    <Item onPress={onPress} index={index} rating={rating}
    Meta={({style}) => <Meta style={style} songCount={songCount} albumCount={albumCount} genreCount={genreCount} />}
      title={title} cover={cover} style={{ }} type="artist" />
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
