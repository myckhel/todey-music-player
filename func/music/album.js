// import _ from 'loadash'
import Base from './Base'
import genres from './genre'
import rating from './rating'
// import musics from '../../data/musics'

class Albums extends Base {
  constructor(musics = []) {
    super(musics, 'albums')
  }

  append = () => {
    this.albums.map((item) => {
      item.genreCount = genres(item.songs).count()
      item.rating = rating().count('album', item)
    })
  }
}

export default albums = (musics = []) => {
  return new Albums(musics)
}


// const artists = new Albums(musics, 'albums')
// artists.store();
// console.log(artists.store());
