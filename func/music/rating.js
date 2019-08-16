
class Rating {
  constructor() {

  }

  songsWithRating = (songs) => {
    const musics = []
    songs.map((song) => {
      song.rating = this.count('song', song)
      musics.push(song)
    })
    return musics
  }

  count = (type, obj) => {
    let count = 0
    switch (type) {
      case 'song':
        count = 0
        break;
      case 'artist':
        count = 0
        break;
      case 'album':
        count = 0
        break;
      case 'genre':
        count = 0
        break;
      case 'playlist':
        count = 0
        break;
      default:
        count = 0
    }
    return count
  }
}

export default () => {
  return new Rating()
}
