import React from 'react'
import { todaysObj } from './Words'


function openHelp() {
  document.getElementById("helps").style.display = "block"
}

function closeHelp() {
  document.getElementById("helps").style.display = "none";
}

function openHints() {
  document.getElementById("hints").style.display = "block"
}

function closeHints() {
  document.getElementById("hints").style.display = "none";
}

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
      <div>
        <button className="tips" onClick={openHelp}>Instructions</button>
        <button className="tips" onClick={openHints}>Word Definition</button>
      </div>
      <div id="helps">
        <div class="instructions">
          <h2>Background</h2>
          <p>There are three basic parts to medical terminology:</p>
            <ol>
              <li>a prefix (comes at the beginning and usually identifies some subdivision or part of the central meaning)</li>
              <li>a word root (usually the middle of the word and its central meaning)</li>
              <li>a suffix (comes at the end and modifies the central meaning as to what or who is interacting with it or what is happening to it)</li>
            </ol>
            <p>However, for the sake of simplicity, this game will only include the root and suffix (for now).</p>
          <h2>Instructions</h2>
          <p>With the definition of a prefix and suffix, figure out the medical terminology!
          </p>
          <img src="https://globalrph.com/wp-content/uploads/2019/01/medical-terminology.png" className="term-example"></img>
          <a href="#" className="close" onClick={closeHelp} />
        </div>
      </div>
      <div id="hints">
        <div className="instructions">
          <h2>Word Definition</h2>
          <p>{todaysObj["definition"]}</p>
          <a href="#" className="close" onClick={closeHints} />
        </div>
      </div>
    </div>
  )
}

export default Hints;