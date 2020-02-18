import React, { Component } from 'react'
import AnimeStore from "../../stores/AnimeStore"
import Actions from "../../actions"
import SpriteList from "./SpriteList"
import LoadingBar from '../loader/LoadingBar'

export default class AnimeListContainer extends Component {
  state = {
    animes: [],
    loading: true
  }

  componentDidMount() {
    AnimeStore.listen(this.onChange)
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)

    Actions.getAnimes("")
  }

  componentWillUnmount() {
    AnimeStore.unlisten(this.onChange)
  }

  onChange = store => {
    const { animes } = store
    this.setState({ animes })
  }

  render() {
    if (this.state.loading) {
      return <LoadingBar />
    }

    return (
      <div>
        <SpriteList data={this.state.animes} />
      </div>
    )
  }
}