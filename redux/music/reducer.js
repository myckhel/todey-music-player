import {
  LOAD_MUSIC, LOADING_MUSIC, TOGGLE_PLAY, PLAY_SONG
} from "../../constants/actionTypes";

import storeArtists from "../../func/music/artist";
import storeAlbums from "../../func/music/album";
import storeGenres from "../../func/music/genre";
import rating from '../../func/music/rating'

import { setItem } from '../../func/app'

import { loadingMusic } from './actions';

const INIT_STATE = {
  musics: [],
  Playlists: [],
  artist: {},
  album: {},
  genre: {},
  loading: false,
  playing: {
    music: {},
    inPlay: false,
    playing: false,
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
      const album = storeAlbums(action.payload)
      const genre = storeGenres(action.payload)
      const artist = storeArtists(action.payload)
      const musics = rating().songsWithRating(action.payload)
      setItem('songs', musics)
      return merge(state, {musics, artist, album, genre});
    case LOADING_MUSIC:
      return merge(state, {loading: action.payload});
    case TOGGLE_PLAY:
      return merge(state, {playing: merge(state.playing, {paused: !state.playing.paused} ) } );
    case PLAY_SONG:
      return merge(state, {playing: merge(state.playing,  {music: action.payload, inPlay: true, playing: true}) } );
    default:
      return { ...state };
  }
};
