import album from './album'
import artist from './artist'
import genre from './genre'
import { loadMusics, loadingMusic } from "../../redux/actions";
import { store } from '../../redux/store';

class Music {
  songs = []; albums = []; artists = []; genres = []
  constructor(songs) {
    this.songs = songs
    this.albums = album(songs)
    this.artists = artist(songs)
    this.genres = genre(songs)
  }

  appendSong = (song) => {
    store.dispatch(loadingMusic(true))
    this.songs.push(songs)
    store.dispatch(loadMusics(song))
    store.dispatch(loadingMusic(false))
  }

  add = (songs) => {
    let duplicate = false
    // !check duplicate
    songs.map((s) => {
      this.songs.map((m) => {
        if ((m.author && m.author === s.author)
        && (m.title && m.title === s.title)) {
          duplicate = true
        }
      })
      if (!duplicate) {
        // add
        this.songs.push(s)
      } else {
        duplicate = false
      }
    })
    // dispatch action
    store.dispatch(loadingMusic(true))
    store.dispatch(loadMusics(this.songs))
    store.dispatch(loadingMusic(false))
  }

}

const m = new Music([])
export default m
