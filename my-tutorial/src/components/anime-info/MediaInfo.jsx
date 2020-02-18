import React, { Fragment } from 'react'

const MediaInfo = ({ type }) => {
  const media = {
    iconName: "fa-file-video",
    message: "Animation"
  }
  
  if (type === 'TV') {
    media.iconName = "fa-tv"
    media.message = "TV Show"
  } else if (type === 'Movie') {
    media.iconName = "fa-film"
    media.message = "Movie"
  } else if (type === 'OVA') {
    media.iconName = "fa-video"
    media.message = "OVA"
  }

  return (
    <Fragment>
      <i className={`fa ${media.iconName} anime-icon`} />
      <div className="detail-item">
        {media.message}
      </div>
    </Fragment>
  )
}

export default MediaInfo