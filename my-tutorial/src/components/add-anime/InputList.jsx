import React from "react";
import { toCamelCase } from '../../utils'

const placeholders = {
  name: 'Ashley Moaaaisson',
  type: 'Movie',
  episodes: '12',
  rating: '1 - 10',
  members: '100'
}

const InputList = ({ formValues, handleInput }) => {
  const inputJSX = Object.keys(formValues).map(key => {
    const value = formValues[key]
    const keyName = key.toLowerCase()

    return (
      <div key={keyName} className="animated-input-box">
        <input 
          id={keyName} 
          name={keyName}
          className="animated-input"
          placeholder={placeholders[keyName]} 
          value={value} 
          onChange={handleInput}
        />
        <label htmlFor={keyName}>{toCamelCase(keyName)}</label>
      </div>
    )
  })

  return inputJSX
}

export default InputList;