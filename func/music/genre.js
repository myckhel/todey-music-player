// import _ from 'loadash'
import Base from './Base'
// import albums from './album'
import rating from './rating'
// import musics from '../../data/musics'

class Genre extends Base {
  constructor(musics = []) {
    super(musics, 'genres')
    // this.setUp()
    // this.musics = musics
  }

  append = () => {
    const items = this.genres

    items.map((item) => {
      item.albumCount = albums(item.songs).count()
      item.rating = rating().count('genre', item)
    })

    this.genres = items
  }
}

export default genres = (musics = []) => {
  return new Genre(musics)
}
