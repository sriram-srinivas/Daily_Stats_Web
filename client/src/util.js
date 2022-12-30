const Form = document.getElementById("inputform")
const saveButton = document.getElementById("saveButton")

const saveForm = e => {
    e.preventDefault();

const data ={}
Array.from(Form.elements).forEach((input) => {
 const ele =  document.getElementById(input.getAttribute("id"))
 const name = ele.getAttribute("name")
 let value;
 switch(ele.type){
    case "number":
    case "textarea":
    case "text":
        value = ele.value
    break;
  case "checkbox":
        value = ele.checked
    break;
    case "submit":
    case "button":
        break;
  default:
    break;

 }
 (value != null ||  value != undefined )&& (data[name]=value)
});
}

saveButton.addEventListener('click',saveForm)