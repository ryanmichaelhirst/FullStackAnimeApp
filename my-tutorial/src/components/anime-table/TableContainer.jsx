import React, { Component } from 'react'
import AnimeStore from '../../stores/AnimeStore'
import Actions from '../../actions'
import Table from './Table'
import ResetButton from './ResetButton'
import KH from "../../res/gifs/KH.gif"

export default class TableContainer extends Component {
  state = {
    animes: []
  }

  componentDidMount() {
    AnimeStore.listen(this.onChange)
    Actions.getAnimes("")
  }

  componentWillUnmount() {
    AnimeStore.unlisten(this.onChange)
  }

  onChange = store => {
    const { animes } = store
    this.setState({ animes })
  }

  handleDelete = event => {
    const { id } = event.target
    Actions.deleteAnime(id)
  }

  handleReset = () => {
    Actions.resetAnimeTable("")
    Actions.resetAnimeGenreTable("")
    Actions.resetUserTable("")
    Actions.resetReviewTable("")
    Actions.resetUserReviewTable("")
  }

  render() {
    const data = this.state.animes.map(item => {
      item.Actions = <i className="fa fa-trash-alt delete-button" id={item.anime_id} onClick={this.handleDelete} title="Delete" />

      return item
    })

    return (
      <div>
        <div className="centered-row" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <div className="table-title">
            Anime Information
          </div>
          <ResetButton onClick={this.handleReset} />
        </div>
        <div className="centered-row">
          <img src={KH} alt="KH" />
        </div>
        <Table data={data} />
      </div>
    )
  }
}
