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
    const items = this[this.name]

    items.map((item) => {
      console.log(item);
      item.genreCount = genres(item.songs).count()
      item.albumCount = albums(item.songs).count()
      item.rating = rating().count(singularName, item)
    })

    this[this.name] = items
  }
}

export default artists = (musics = []) => {
  return new Artist(musics)
}
