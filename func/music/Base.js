// import _ from 'loadash'
// import musics from '../../data/musics'
import rating from './rating'

export default class Base {
  constructor(musics = [], name) {
    this.name = name
    this.musics = musics
    this.setUp()
    // console.log(name);
  }

  update = (musics) => {
    this.musics = musics
    return this.store()
  }

  count = () => {
    return this[this.name].length
  }

  setUp = () => {
    let items = []
    const names = []
    const singularName = this.name.substr(0,this.name.length-1)
    this.musics.map((music) => {
      if (names.includes(music[singularName])) {
        const index = names.indexOf(music[singularName])
        items[index].songs.push(music)
        items[index].musicCount = items[index].musicCount + 1
      } else {
        names.push(music[singularName])
        items.push({
          songs: [music],
          title: music[singularName],
          cover: music.cover,
          musicCount: 1,
        })
      }
    })

    items.map((item) => {
      item.rating = rating().count(singularName, item)
      // return item
    })
    // console.log(items);

    this[this.name] = items
  }

  append = () => {

  }

  store = () => {
    this.setUp()
    this.append()
    return {
       [this.name]: this[this.name],
       no: this.count(),
    }
  }
}

// const artists = new Base(musics, 'artists')
// // artists.store();
// console.log(artists.count());
