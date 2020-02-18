import React, { Component } from 'react'
import FilterToggle from './FilterToggle'
import toggles from './toggles';

export default class AlphabetFilter extends Component {
  state = {
    toggles,
    allToggle: { 
      letter: 'ALL', 
      toggledOn: true 
    }
  }

  setAllTogglesOn = event => {
    const { id } = event.target
    const { toggles } = this.state
    Object.keys(toggles).forEach(key => {
      const toggle = toggles[key]
      toggle.toggledOn = true
    })

    this.props.onFilter(id)
    this.setState({ toggles })
  }

  onToggle = event => {
    const { id } = event.target
    const { toggles } = this.state
    const { toggledOn } = toggles[id]
    toggles[id].toggledOn = !toggledOn

    this.props.onFilter(id, !toggledOn)
    this.setState({ toggles })
  }

  render() {
    const { toggles, allToggle } = this.state
    const filtersJSX = Object.keys(toggles).map(key => {
      const toggle = toggles[key]

      return (
        <FilterToggle
          label={toggle.letter}
          onClick={this.onToggle}
          color={'#267346'}
          key={toggle.letter}
          id={toggle.letter}
          toggledOn={toggle.toggledOn}
          customClass={"alphabet-filter-button"}
        />
      )
    })
  
    const allButton = (
      <FilterToggle 
        label={allToggle.letter} 
        onClick={this.setAllTogglesOn}
        color={'#267346'} 
        key={allToggle.letter}
        id={allToggle.letter}
        toggledOn={allToggle.toggledOn}
        customClass={"alphabet-filter-button all-button"}
      />
    )
    filtersJSX.unshift(allButton)
    
    return (
      <div className="centered-row">
        {filtersJSX}
      </div>
    )
  }
}
