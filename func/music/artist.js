// import _ from 'loadash'
import Base from './Base'
import albums from './album'
import genres from './genre'
import rating from './rating'

class Artist extends Base {
  constructor(musics = [], name = 'authors') {
    super(musics, 'authors')
  }

  append = () => {
    this[this.name].map((item) => {
      item.genreCount = genres(item.songs).count()
      item.albumCount = albums(item.songs).count()
      item.rating = rating().count(this.singularName, item)
    })
  }
}

export default artists = (musics = []) => {
  return new Artist(musics)
}
