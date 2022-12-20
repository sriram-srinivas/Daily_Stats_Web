import React from 'react'

const App = props =>{
return(
    <form id="inputform" name="inputform">
    <div className={"container"}>
      <h1 className={"header"}>Stats</h1>
      <div className={"inputRow DateRow"}>
        <div>
            <label className={"inputLabel"}>Date</label>
        </div>
        <div>
          <input type="text" id="date" name="date" className={"dateInput"}/>
        </div>
      </div>
      <div className={"inputRow NFRow"}>
        <div>
            <label className={"inputLabel"}>NF</label>
        </div>
        <div>
          <input type="checkbox" id="noFight" name="noFight" className={"NFInput"}/>
        </div>
      </div>
      <div className={"inputRow NIRow"}>
        <div>
            <label className={"inputLabel"}>No Interruption</label>
        </div>
        <div>
          <input type="checkbox" id="noInterruption" name="noInterruption" className={"NIInput"}/>
        </div>
      </div>
      <div className={"inputRow goodTalkRow"}>
        <div>
            <label className={"inputLabel"}>Good Talk</label>
        </div>
        <div>
          <input type="checkbox" id="goodTalk" name="goodTalk" className={"goodTalkInput"}/>
        </div>
      </div>
      <div className={"inputRow reachedRow"}>
        <div>
            <label className={"inputLabel"}>Reached Informed</label>
        </div>
        <div>
          <input type="checkbox" id="reached" name="reached" className={"reachedInput"}/>
        </div>
      </div>
      <div className={"inputRow lunchRow"}>
        <div>
            <label className={"inputLabel"}>Lunch informed</label>
        </div>
        <div>
          <input type="checkbox" id="lunch" name="lunch" className={"lunchInput"}/>
        </div>
      </div>
      <div className={"inputRow satLvlRow"}>
        <div>
            <label className={"inputLabel"}>SAT lvl %</label>
        </div>
        <div>
          <input type="number" min="1" max="100" id="satLvl" name="satLvl" className={"satLvlInput"}/>
        </div>
      </div>
      <div className={"inputRow commentsRow"}>
        <div>
            <label className={"inputLabel"}>Comments</label>
        </div>
        <div>
          <textarea type="textarea" name="comments" id="comments" className={"commentsInput"} rows="4" cols="5"></textarea>
        </div>
      </div>
      <div className={"inputRow suggestionsRow"}>
        <div>
            <label className={"inputLabel"}>Suggestions</label>
        </div>
        <div>
          <textarea type="textarea" name="suggestions" id="suggestions" className={"suggestionsInput"} rows="4" cols="5"></textarea>
        </div>
      </div>
      <div className={"inputRow saveRow"}>
          <input type="button" id="saveButton" value="Save" className={"saveButton"}/>

      </div>
    </div>
  </form> 
)

}

export default App