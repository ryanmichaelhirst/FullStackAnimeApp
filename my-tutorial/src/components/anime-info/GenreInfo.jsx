import React, { Fragment } from 'react'

const GenreInfo = ({ genres }) => {
  if (!genres) 
    return null

  const genresJSX = genres.map(genre => {
    return (
      <div 
        className="detail-item"
        key={genre.genre}
      >
        {genre.genre}
      </div>
    )
  })

  return (
    <Fragment>
      <i className="fa fa-tags anime-icon" />
      {genresJSX}
    </Fragment>
  )
}

export default GenreInfo