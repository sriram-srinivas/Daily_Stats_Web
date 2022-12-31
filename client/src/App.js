import React,{useState} from 'react'
import axios from 'axios';
import './index.css';
import {dailyStatFields} from './constants/componentSourceConstants';
import Textbox from './components/textBox/textbox';
import Checkbox from './components/checkbox/checkbox';
import Number from './components/number/number';
import TextArea from './components/textArea/textArea';

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
    const response = false && await axios.post(url, state)
    console.log(response.data);
    alert(response.data ? "Success!!" : "Error")
  }
return(
    <form id="inputform" name="inputform">
    <div className={"container"}>
      <h1 className={"header"}>Stats</h1>
      <Textbox {...dailyStatFields.dateField} state={state} onChangeHandler={handleTextChange}/>
      <Checkbox {...dailyStatFields.noFightField} state={state} onChangeHandler={handleTextChange}>
        <Textbox {...dailyStatFields.noFightDescField} state={state} onChangeHandler={handleTextChange}/>
      </Checkbox>
      <Checkbox {...dailyStatFields.noInterruptionField} state={state} onChangeHandler={handleTextChange}>
        <Textbox {...dailyStatFields.noInterruptionDescField} state={state} onChangeHandler={handleTextChange}/>
      </Checkbox>
      <Checkbox {...dailyStatFields.goodTalkField} state={state} onChangeHandler={handleTextChange}>
        <Textbox {...dailyStatFields.goodTalkDescField} state={state} onChangeHandler={handleTextChange}/>
      </Checkbox>
      <Checkbox {...dailyStatFields.reachedInformedField} state={state} onChangeHandler={handleTextChange}>
        <Textbox {...dailyStatFields.reachedInformedDescField} state={state} onChangeHandler={handleTextChange}/>
      </Checkbox>
      <Checkbox {...dailyStatFields.lunchInformedField} state={state} onChangeHandler={handleTextChange}>
        <Textbox {...dailyStatFields.lunchInformedDescField} state={state} onChangeHandler={handleTextChange}/>
      </Checkbox>
      <Number {...dailyStatFields.satLvlField} state={state} onChangeHandler={handleTextChange}/>
      <TextArea {...dailyStatFields.commentsField} state={state} onChangeHandler={handleTextChange}/>
      <TextArea {...dailyStatFields.suggestionsField} state={state} onChangeHandler={handleTextChange}/>
      <div className={"inputRow saveRow"}>
          <input type="button" id="saveButton" value="Save" className={"saveButton"} onClick={submitData}/>

      </div>
    </div>
  </form> 
)

}

export default App