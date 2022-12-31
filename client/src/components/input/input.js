import React from 'react'

const Input = ({type,contanierClass,label,ID,state,onChangeHandler,children,addnlAttr}) =>{
return(
   <>
      <div className={`inputRow ${contanierClass}`}>
      {label && <div>
            <label className={"inputLabel"}>{label}</label>
        </div>}
        <div>
          <input type={type} id={ID} name={ID} value={state[ID]} onChange={onChangeHandler} {...addnlAttr}/>
          {children}
        </div>
      </div>
    </>
)}

export default Input