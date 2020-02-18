import React from 'react'

const SearchBar = ({ keyName, placeholder, onSearch }) => {
  return (
    <div key={keyName} style={{ display: 'inline-flex', flexFlow: 'column-reverse', marginBottom: '1em' }}>
        <input 
          id={keyName} 
          name={keyName} 
          placeholder={placeholder} 
          style={{ width: 300 }}
          className="animated-input"
          onChange={onSearch}
        />
        <label htmlFor={keyName}>Search</label>
    </div>
  )
}

export default SearchBar