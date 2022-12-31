import React from 'react'

const TextArea = ({type,contanierClass,label,ID,state,onChangeHandler,key,children,addnlAttr}) =>{
return(
   <>
      <div className={`inputRow ${contanierClass}`}>
        <div>
            <label className={"inputLabel"}>{label}</label>
        </div>
        <div>
          <textarea type={"textarea"} id={ID} name={ID} value={state[ID]} onChange={onChangeHandler} {...addnlAttr} rows="4" cols="5"/>
        </div>
      </div>
    </>
)}

export default TextArea