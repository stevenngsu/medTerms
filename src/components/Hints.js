import React from 'react'

function Hints({ todaysObj }) {
  return (
    <div>
      <div className="definitions">
          <h2>Prefix Definition:</h2>
          <p>{todaysObj["prefix_definition"]}</p>
      </div>
      <div className="definitions">
          <h2>Suffix Definition:</h2>
          <p>{todaysObj["suffix_definition"]}</p>
      </div>
    </div>
  )
}

export default Hints;