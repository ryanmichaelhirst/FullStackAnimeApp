import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GIFS from './Gifs'

export default class SpriteList extends Component {
  state = {
    upperBound: 100
  }

  increaseRange = () => {
    const { upperBound } = this.state
    this.setState({ upperBound: upperBound + 100 })
  }

  render() {
    const { upperBound } = this.state
    const spriteJSX = this.props.data.slice(0, upperBound).map(anime => {
      const gif = GIFS[Math.floor(Math.random() * GIFS.length)]

      return (
        <Link to={`/animeInfo/${anime.anime_id}`} key={anime.row_id}>
          <div className="sprite-container">
            <div className="left-aligned">
              <div className="centered-row inline-block" style={{ width: '25%', paddingTop: 3, paddingBottom: 3, backgroundColor: '#F58', marginBottom: 20, borderRadius: 3 }}>
                {anime.type}
              </div>
            </div>
            <img src={gif} alt={`${anime.name}-gif`} />
            <div className="sprite-title">
              {anime.name}
            </div>
          </div>
        </Link>
      )
    })

    return (
      <div className="centered-row" style={{ marginTop: 20, marginBottom: 20 }}>
        {spriteJSX}
        <div>
          <div className="loading-button">
            <button onClick={this.increaseRange}>Load More</button>
          </div>
        </div>
      </div>
    )
  }
}