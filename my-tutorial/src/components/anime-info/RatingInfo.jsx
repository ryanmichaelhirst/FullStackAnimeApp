import React from 'react'

const RatingInfo = ({ rating }) => {
  const starMeter = []
  for (let ii = 0; ii < 10; ii++) {
    const customClass = ii < rating ? "star-colored" : ""
    const star = <i className={`fa fa-star ${customClass}`} key={ii} />

    starMeter.push(star)
  }

  return (
    <div className="star-meter-container">
      <div className="star-meter">
        {starMeter}
      </div>
    </div>
  )
}

export default RatingInfo