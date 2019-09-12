// import _ from 'loadash'
// import musics from '../../data/musics'
import rating from './rating'

export default class Base {
  constructor(musics = [], name) {
    this.name = name
    this.singularName = name.substr(0,name.length-1)
    this.musics = musics
    this.setUp()
    // console.log(name);
  }

  search = (q) => this[this.name].map(
      (s) => {console.log(q, this.name);return s[this.singularName] === q}
      // || s.artist === q
    )

  update = (musics) => {
    this.musics = musics
    return this.store()
  }

  count = () => {
    return this[this.name].length
  }

  nullOrNot = (string) => {
    if(!string || string === ''){
      return `unknown ${this.singularName}`
    }
    return string
  }

  setUp = () => {
    let items = []
    const names = []
    this.musics.map((music) => {
      if (names.includes(this.nullOrNot(music[this.singularName]))) {
        const index = names.indexOf(this.nullOrNot(music[this.singularName]))
        items[index].songs.push(music)
        items[index].musicCount = items[index].musicCount + 1
      } else {
        names.push(this.nullOrNot(music[this.singularName]))
        items.push({
          songs: [music],
          title: this.nullOrNot(music[this.singularName]),
          cover: music.cover,
          musicCount: 1,
        })
      }
    })

    items.map((item) => {
      item.rating = rating().count(this.singularName, item)
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
