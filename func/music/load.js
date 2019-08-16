import musics from '../../data/musics'
import MusicFiles from 'react-native-get-music-files'
// console.log(MusicFiles.getAll);

// export const
export default async () => {
  return new Promise(async function(resolve, reject) {
    try {
      resolve(musics)
      // const {status} = await Permissions.getAsync(
      //   Permissions.CAMERA_ROLL
      //   // 'READ_EXTERNAL_STORAGE'
      // )
      // console.log(status);
      // if (status !== 'undetermined') {
      //     reject(status)
      // } else {
      //   const media = await MediaLibrary.getAssetsAsync({
      //     mediaType: MediaLibrary.MediaType.music
      //   })
      //   console.log(media);
      //   resolve(media)
      // }


      // const ms = await MusicFiles.getAll({
      //   id: true,
      //   blured: true,
      //   artist: true,
      //   duration: true,
      //   cover: true,
      //   title: true,
      //   batchNumber: 5,
      //   fields: ['title', 'artwork', 'lyrics', 'duration', 'artist', 'genre', 'albumTitle']
      // })
      // console.log(ms);
      // .then((musics) => {
      //   resolve(musics)
      // })
      // .catch((err) => {
      //   reject(err)
      //   console.log({err});
      // })
    } catch (e) {
        console.log({e});
    }
  });
}
