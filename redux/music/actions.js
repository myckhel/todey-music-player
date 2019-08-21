import { LOAD_MUSIC, LOADING_MUSIC, TOGGLE_PLAY, PLAY_SONG } from '../../constants/actionTypes';

export const loadMusics = (musics) => ({
  type: LOAD_MUSIC,
  payload: musics
})

export const loadingMusic = (bool) => ({
  type: LOADING_MUSIC,
  payload: bool
})

export const togglePlay = () => ({
  type: TOGGLE_PLAY,
})

export const play = (song) => ({
  type: PLAY_SONG,
  payload: song,
})
