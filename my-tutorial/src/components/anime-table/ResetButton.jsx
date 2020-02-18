import React from 'react'

const ResetButton = ({ onClick }) => {
  return (
      <i
        className="fa fa-redo-alt reset-button"
        onClick={onClick}
        title="Reset Database"
      >
        <span style={{ marginLeft: 10 }}>Reset Database</span>
      </i>
  )
}

export default ResetButton