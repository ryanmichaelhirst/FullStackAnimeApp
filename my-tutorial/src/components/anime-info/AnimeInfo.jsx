import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AnimeStore from "../../stores/AnimeStore"
import Actions from "../../actions"
import RatingInfo from './RatingInfo'
import MediaInfo from './MediaInfo'
import GenreInfo from './GenreInfo'
import Placeholder from '../../res/imgs/placeholder.jpeg'
import IconList from './IconList'
import ReviewContainer from '../reviews/ReviewContainer'

export default class AnimeInfo extends Component {
  state = {
    anime: {},
    reviews: [],
    genres: []
  }

  componentDidMount() {
    const { id } = this.props.match.params

    AnimeStore.listen(this.onChange)
    Actions.getAnime(id)
    Actions.getReviews(id)
    Actions.getGenres(id)
  }

  componentWillUnmount() {
    AnimeStore.unlisten(this.onChange)
  }

  onChange = store => {
    const { anime, reviews, genres } = store
    this.setState({ anime, reviews, genres })
  }

  render() {
    const { anime, reviews, genres } = this.state
    const { anime_id, members, name, rating, type } = anime
    
    return (
      <div className="centered-row" style={{ marginTop: 10 }}>
        <Link to="/list">
          <div className="back-button">
            <i className="fa fa-arrow-left" style={{ marginLeft: 5, marginRight: 10 }} />
            Back
          </div>
        </Link>

        <div className="anime-info">
          <div className="details">
            <div style={{ display: 'block', marginTop: 10, paddingLeft: 20 }}>
              <RatingInfo rating={rating} />
            </div>

            <div className="anime-title">
              {name}
            </div>

            <div style={{ display: 'inline', marginLeft: 20 }}>
              <i className="fa fa-users anime-icon" />
              <div className="detail-item">{members}</div>
            </div>

            <div style={{ display: 'inline', marginLeft: 20 }}>
              <MediaInfo type={type} />
            </div>
            <div className="inline-block" style={{ maxWidth: 300, verticalAlign: 'top', marginLeft: 20 }}>
              <GenreInfo genres={genres} />
            </div>

            <div style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
              <div className="anime-available-tag">
                Available on
              </div>
              <IconList />
            </div>
          </div>

          <div className="anime-img" style={{ backgroundImage: `url('${Placeholder}')`}} />
        </div>

        <div style={{ marginTop: 40 }}>
          <ReviewContainer 
            reviews={reviews} 
            members={members} 
            anime_id={anime_id}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
        
      </div>
    )
  }
}