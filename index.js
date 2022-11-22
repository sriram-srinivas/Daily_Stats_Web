const Form = document.getElementById("inputform")
const saveButton = document.getElementById("saveButton")

const saveForm = e => {
    e.preventDefault();
    let formData = new FormData([Form]);
    console.log("saveClick",Form,formData);
}

saveButton.addEventListener('click',saveForm)