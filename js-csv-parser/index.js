const Papa = require('papaparse')
const fs = require('fs')

function createFile(filePath, data, msg) {
  fs.writeFile(filePath, data, err => {
    if (err) throw err;
    console.log(msg)
  })
}

// remove white space from genres
function removeWhiteSpace(arr) {
  const trimmed = arr.map(item => {
    return item.trim()
  })

  return trimmed
}

// create file
const animeFile = './csv/anime.csv'
const animeContent = fs.readFileSync(animeFile, "utf8")

// parse csv 
const animeResults = {}
Papa.parse(animeContent, {
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    animeResults.data = results.data
    animeResults.errors = results.errors
    animeResults.meta = results.meta
  }
})

// create array of objects with anime id as key and value as array of genres
const parsed = []
let genreSet = new Set()
animeResults.data.forEach(data => {
  const genres = data.genre.split(',')
  genres.forEach(genre => {
    genreSet.add(genre.trim())
  })
  parsed.push({ [data.anime_id]: removeWhiteSpace(genres) })
})

// create unique id mapping for every genre
const sortedGenres = Array.from(genreSet).sort()
let id = 1
const genreArray = []
sortedGenres.forEach(genre => {
  genreArray.push({ genre, id })
  id++
})

// mapping logic to create anime tables
const animeGenreArray = []
const animeArray = []
animeResults.data.forEach(anime => {
  const { name, anime_id, genre, type, episodes, rating, members } = anime
  const genres = genre.split(',')
  const trimmedName = name.replace(/,/g, ' ')

  animeArray.push({ name: trimmedName, anime_id, type, episodes, rating, members })

  genres.forEach(animeGenre => {
    genreArray.forEach(genre => {
      if (animeGenre.trim() === genre.genre) {
        animeGenreArray.push({ anime_id, genre_id: genre.id })
      }
    })
  })
})

// genre table
const genreData = Papa.unparse(genreArray)
createFile("./csv/tableGenres.csv", genreData, "Genres table successfully saved")

// anime table
const animeData = Papa.unparse(animeArray)
createFile("./csv/tableAnimes.csv", animeData, "Anime table successfully saved")

// anime_genre table
const animeToGenreData = Papa.unparse(animeGenreArray)
createFile("./csv/tableAnimeGenre.csv", animeToGenreData, "Anime_Genre table successfully saved")