import React from "react"

const GenreTags = ({ genres, selectedGenres, handleClick }) => {
  const genreButtons = genres.map(genre => {
    const genreName = genre.genre
    const selected = selectedGenres[genreName] ? true : false
    
    return (
      <div className="inline-block" key={genre.id}>
        <button className={selected ? 'genre-button-selected': 'genre-button'} onClick={handleClick} id={genre.id} name={genre.genre}>
          {genre.genre}
        </button>
      </div>
    )
  })

  return genreButtons
}

export default GenreTags