import React, { Component } from "react"
import GenreStore from "../../stores/GenreStore"
import Actions from "../../actions"
import InputList from "./InputList"
import GenreTags from "./GenreTags"

export default class AddAnimeForm extends Component {
  state = {
    genres: [],
    selectedGenres: {},
    formValues: {
      name: '',
      type: '',
      episodes: '',
      rating: '',
      members: ''
    },
    largestAnimeId: null
  }

  componentDidMount() {
    GenreStore.listen(this.onChange)
    Actions.getAllGenres("")
    Actions.getLargestAnimeId("")
  }

  componentWillUnmount() {
    GenreStore.unlisten(this.onChange)
  }

  onChange = store => {
    const { genres, largestAnimeId } = store
    this.setState({ genres, largestAnimeId })
  }

  handleInput = event => {
    const { formValues } = this.state
    const { id, value } = event.target
    formValues[id] = value
    this.setState({ formValues })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { formValues, largestAnimeId, selectedGenres } = this.state

    formValues.animeId = largestAnimeId + 1
    formValues.genres = selectedGenres
    Actions.addAnime(formValues)
  }

  handleClick = event => {
    event.preventDefault();

    const genre = event.target.name
    const genreId = event.target.id
    const { selectedGenres } = this.state

    selectedGenres[genre] ? delete selectedGenres[genre] : selectedGenres[genre] = parseInt(genreId)
    
    this.setState({ selectedGenres })
  }

  render() { 
    const { formValues, selectedGenres, genres } = this.state

    return (
      <div className="centered-row" style={{ marginTop: 20 }}>
        <div className="add-form-card">
          <div className="add-form-title">
            Add Anime
          </div>

          <form className="add-form" onSubmit={this.handleSubmit} >
            <div className="inline-block">
              <InputList formValues={formValues} handleInput={this.handleInput} />
              <div className="left-aligned">
                <input type="submit" value="Add Anime" className="add-form-submit" />
              </div>
            </div>
            
            <div className="add-form-element left-aligned inline-block" style={{ marginTop: 10, verticalAlign: 'top' }}>
              <p className="inline-block" style={{ color: 'white', paddingRight: 10, marginBottom: 0 }}>Genres</p>
              <GenreTags genres={genres} selectedGenres={selectedGenres} handleClick={this.handleClick} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}