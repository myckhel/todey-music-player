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

  nullOrNot = (string) => {
    if(!string || string === ''){
      return `unknown ${singularName}`
    }
    return string
  }


  setUp = () => {
    singularName = this.name.substr(0,this.name.length-1)
    let items = []
    const names = []
    this.musics.map((music) => {
      if (names.includes(this.nullOrNot(music[singularName]))) {
        const index = names.indexOf(this.nullOrNot(music[singularName]))
        items[index].songs.push(music)
        items[index].musicCount = items[index].musicCount + 1
      } else {
        names.push(this.nullOrNot(music[singularName]))
        items.push({
          songs: [music],
          title: this.nullOrNot(music[singularName]),
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
