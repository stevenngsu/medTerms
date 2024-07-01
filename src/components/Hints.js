import React from 'react'
import { todaysObj } from './Words'

function Hints() {
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