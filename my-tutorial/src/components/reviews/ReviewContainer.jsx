import React, { Component } from 'react'
import CommentBox from './CommentBox'
import Reviews from './Reviews'
import Actions from "../../actions"

export default class ReviewContainer extends Component {
  onSubmit = review => {
    const { anime_id, loggedInUser } = this.props
    Actions.postReview({ review, anime_id, user_id: loggedInUser.user_id, date_time: new Date() })
  }

  sortByDate = (a, b) => {
    const aDate = a.date_time
    const bDate = b.date_time

    return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
  }

  render() {
    const { reviews, anime_id, members, loggedInUser } = this.props
    const reviewStr = reviews.length > 1 ? 'reviews' : 'review'
    const sortedReviews = reviews.sort(this.sortByDate)

    return (
      <div>
        <div className="review">
          <div className="review-count">
            <span>{reviews.length} {reviewStr}</span>
          </div>
  
          <CommentBox
            onSubmit={this.onSubmit}
            anime_id={anime_id} 
            loggedInUser={loggedInUser} 
          />

          <Reviews 
            reviews={sortedReviews} 
            members={members} 
            anime_id={anime_id}
            loggedInUser={loggedInUser}
          />
        </div>
      </div>
    )
  }
}