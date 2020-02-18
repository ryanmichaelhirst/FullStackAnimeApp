import React from 'react'
import Icons from './Icons'

const IconList = () => {
  const icons = Icons.map(icon => {
    return (
      <img src={icon} alt={`${icon}-link`} key={icon} />
    )
  })

  return (
    <div className="icon-list">
      {icons}
    </div>
  )
}

export default IconList