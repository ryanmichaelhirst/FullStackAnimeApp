import React from 'react'
import uuidv4 from 'uuid/v4'

const Reviews = ({ reviews }) => {
  const reviewsJSX = reviews.map(review => {
    const dateTime = new Date(review.date_time)

    return (
      <div className="left-aligned" key={uuidv4()} style={{ marginTop: 10 }}>
        <div>
          <span style={{ color: '#267346', fontSize: 18, letterSpacing: 1.2 }}>
            {review.username}
          </span>
          <span style={{ marginLeft: 5, color: "#F9D5D5", fontSize: 13, letterSpacing: 0.8 }}>
            {dateTime.toLocaleString()}
          </span>
        </div>
        
        <div style={{ marginTop: 10 }}>
          {review.review}
        </div>
      </div>
    )
  })
  
  return reviewsJSX
}

export default Reviews