import React,{useState} from 'react'
import axios from 'axios';

const App = props =>{
  const [state,setState] = useState({
    "date":new Date(),
    "noFight":false,
    "noInterruption":false,
    "goodTalk":false,
    "reachedInformed":false,
    "lunchInformed":false,
    "satLvl":0,
    "comments":"",
    "suggestions":""
  })
  const handleChange = (key,newVal="") =>{
    setState(prevState => ({...prevState,[key]:newVal}))
  }
  const handleTextChange = ({target}) => {
    const val = target.type === "checkbox" ? target.checked : target.value
    handleChange(target.name,val)
  }
  const submitData = async () => {
    console.log("state",state);
    const url = "https://daily-stats-1bd16-default-rtdb.firebaseio.com/DailyStats.json"
    const response = await axios.post(url, state)
    console.log(response.data);
  }
return(
    <form id="inputform" name="inputform">
    <div className={"container"}>
      <h1 className={"header"}>Stats</h1>
      <div className={"inputRow DateRow"}>
        <div>
            <label className={"inputLabel"}>Date</label>
        </div>
        <div>
          <input type="text" id="date" name="date" value={state.date} className={"dateInput"} onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow NFRow"}>
        <div>
            <label className={"inputLabel"}>NF</label>
        </div>
        <div>
          <input type="checkbox" id="noFight" name="noFight" value={state.noFight} className={"NFInput"} onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow NIRow"}>
        <div>
            <label className={"inputLabel"}>No Interruption</label>
        </div>
        <div>
          <input type="checkbox" id="noInterruption" name="noInterruption" value={state.noInterruption} className={"NIInput"} onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow goodTalkRow"}>
        <div>
            <label className={"inputLabel"}>Good Talk</label>
        </div>
        <div>
          <input type="checkbox" id="goodTalk" name="goodTalk" value={state.goodTalk} className={"goodTalkInput"} onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow reachedRow"}>
        <div>
            <label className={"inputLabel"}>Reached Informed</label>
        </div>
        <div>
          <input type="checkbox" id="reached" name="reachedInformed" value={state.reached} className={"reachedInput"} onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow lunchRow"}>
        <div>
            <label className={"inputLabel"}>Lunch informed</label>
        </div>
        <div>
          <input type="checkbox" id="lunch" name="lunchInformed" value={state.lunch} className={"lunchInput"}  onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow satLvlRow"}>
        <div>
            <label className={"inputLabel"}>SAT lvl %</label>
        </div>
        <div>
          <input type="number" min="1" max="100" id="satLvl" name="satLvl" value={state.satLvl} className={"satLvlInput"} onChange={handleTextChange}/>
        </div>
      </div>
      <div className={"inputRow commentsRow"}>
        <div>
            <label className={"inputLabel"}>Comments</label>
        </div>
        <div>
          <textarea type="textarea" name="comments" id="comments" value={state.comments} className={"commentsInput"} rows="4" cols="5"  onChange={handleTextChange}></textarea>
        </div>
      </div>
      <div className={"inputRow suggestionsRow"}>
        <div>
            <label className={"inputLabel"}>Suggestions</label>
        </div>
        <div>
          <textarea type="textarea" name="suggestions" id="suggestions" value={state.suggestions} className={"suggestionsInput"} rows="4" cols="5"  onChange={handleTextChange}></textarea>
        </div>
      </div>
      <div className={"inputRow saveRow"}>
          <input type="button" id="saveButton" value="Save" className={"saveButton"} onClick={submitData}/>

      </div>
    </div>
  </form> 
)

}

export default App