import {
  LOAD_MUSIC, LOADING_MUSIC, TOGGLE_PLAY
} from "../../constants/actionTypes";
import storeArtists from "../../func/music/artist";
import storeAlbums from "../../func/music/album";
import storeGenres from "../../func/music/genre";
import rating from '../../func/music/rating'

import { loadingMusic } from './actions';

const INIT_STATE = {
  musics: [],
  Playlists: [],
  artist: {},
  album: {},
  genre: {},
  loading: true,
  playing: {
    music: {
      artist: 'Blade',
      title: 'Player',
    },
    playing: true,
    paused: false,
    collapsedPlay: false,
    playingProgress:{
      elapsed: 1.24,//(1.5 / 3) * 100,
      remaining: 3 - 1.5,//100 - ((1.53) * 100),
      total: 3
    },
  }
};


const merge = (state, newState) => {
  return Object.assign({}, state, newState)
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_MUSIC:
      const album = storeAlbums(action.payload).store()
      const genre = storeGenres(action.payload).store()
      const artist = storeArtists(action.payload).store()
      const musics = rating().songsWithRating(action.payload)
      // console.log(artist.store());
      return merge(state, {musics, artist, album, genre});
    case LOADING_MUSIC:
      return merge(state, {loading: action.payload});
    case TOGGLE_PLAY:
      return merge(state, {playing: merge(state.playing, {paused: !state.playing.paused} ) } );
    default:
      return { ...state };
  }
};
