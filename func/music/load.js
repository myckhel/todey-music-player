import musics from '../../data/musics'
import MusicFiles from 'react-native-get-music-files'
import Permissions from 'react-native-permissions'

// export const
export default async () => {
  return new Promise(async function(resolve, reject) {
    try {

      Permissions.request('storage')
      .then(async (res) => {
        console.log(res);
        // const ms = await MusicFiles.getAll({
        //   id: true,
        //   blured: true,
        //   artist: true,
        //   duration: true,
        //   cover: true,
        //   title: true,
        //   batchNumber: 5,
        //   minimumSongDuration: 10000,
        //   fields: ['title', 'artwork', 'lyrics', 'duration', 'artist', 'genre', 'albumTitle']
        // })
        // console.log(ms);
        // .then((musics) => {
          resolve(musics)
        // })
        // .catch((err) => {
        //   reject(err)
        //   console.log({err});
        // })
      })
      .catch((e) => {
        console.log(e);
      })



    } catch (e) {
        console.log({e});
    }
  });
}
