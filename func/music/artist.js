// import _ from 'loadash'
import Base from './Base'
import albums from './album'
import genres from './genre'
import rating from './rating'

class Artist extends Base {
  constructor(musics = [], name = 'artists') {
    super(musics, 'artists')
  }

  append = () => {
    const items = this.artists

    items.map((item) => {
      item.genreCount = genres(item.songs).count()
      item.albumCount = albums(item.songs).count()
      item.rating = rating().count('artist', item)
    })

    this.artists = items
  }
}

export default artists = (musics = []) => {
  return new Artist(musics)
}
