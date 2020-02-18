import React from "react"

const FilterToggle = ({ label, color, customClass, onClick, toggledOn }) => {
  return (
    <button
      onClick={onClick}
      id={label}
      style={{ backgroundColor: color }}
      className={toggledOn ? `basic-toggle ${customClass}` : `basic-toggle inactive-toggle ${customClass}`}
    >
      {label}
    </button>
  )
}

export default FilterToggle