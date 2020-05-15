const backButton = document.querySelector('.button-back');
const forwardButton = document.querySelector('.button-forward');
const submitButton = document.querySelector('#submitButton');
const firstPart = document.querySelector('.first-part');
const secondPart = document.querySelector('.second-part');
const inputFile = document.querySelector('#file');
const otherFormatButton = document.querySelector('#otherFormatButton');
const otherFormatPart = document.querySelector('.otherFormatsInputs');
const formatButtons = document.querySelectorAll('.size-buttons>button:not(#otherFormatButton)');

const mainForm = document.forms["main-form"];
function changePart(direction){
    //direction : boolean, True (to the right), False (to the left)
    if(direction){
        firstPart.classList.remove('is-opened')
        secondPart.classList.add('is-opened')

        backButton.classList.remove('is-hidden');
        forwardButton.classList.add('disabled');
        forwardButton.classList.remove('is-hidden');
        submitButton.classList.remove('is-hidden');
        backButton.classList.remove('disabled')
    } else {
        secondPart.classList.remove('is-opened')
        firstPart.classList.add('is-opened')

        submitButton.classList.remove('is-hidden');
        forwardButton.classList.remove('disabled');
        backButton.classList.add('disabled')
    }
}

backButton.addEventListener('click', () => {
    changePart(false);
})
forwardButton.addEventListener('click', () => {
    changePart(true);
})

function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
}

document.querySelector('#file-select-button').addEventListener('click', () => {
    document.querySelector('#file').click()
})

inputFile.onchange = function(event) {
    var newFileName = inputFile.files[0].name;
    document.querySelector('#file-select-button').textContent = newFileName;
}

otherFormatButton.addEventListener('click', (event) => {
    formatButtons.forEach(button => {
        button.classList.remove('selected');
    })
    otherFormatButton.classList.toggle('selected');
    otherFormatPart.classList.toggle('is-hidden');
    event.preventDefault();
})

formatButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        formatButtons.forEach(button => {
            button.classList.remove('selected');
        })
        document.querySelector('#width').value = event.target.dataset.width;
        document.querySelector('#height').value = event.target.dataset.height;
        validateOnInputChange();
        otherFormatButton.classList.remove('selected');
        event.target.classList.add('selected');
        otherFormatPart.classList.add('is-hidden');
        event.preventDefault();
    })
});

function validateData() {
    const name = mainForm["name"].value;
    const firstname = mainForm["firstname"].value;
    const phoneNumber = mainForm["phoneNumber"].value;
    const building = mainForm["building"].value;
    const office = mainForm["office"].value;
    const fileLength = mainForm["file"].files.length;
    const minimumdate = mainForm["minimumDate"].value;
    const width = mainForm["width"].value;
    const height = mainForm["height"].value;
    const email = mainForm["email"].value;
    const comments = mainForm["comments"].value;

    var validation = true;
    if(name === ""){
        validation = false;
    } else if (firstname === "") {
        validation = false
    } else if (phoneNumber === "") {
        validation = false
    } else if (building === "") {
        validation = false
    } else if (office === "") {
        validation = false
    } else if (fileLength < 1) {
        validation = false
    } else if (minimumdate === "") {
        validation = false
    } else if (width === "" || width === 0 ){
        validation = false
    } else if (height === "" || height === "") {
        validation = false
    } else if (email === ""){
        validation = false
    }
    return validation
}

function validateOnInputChange() {
    if (validateData()){
        submitButton.classList.remove('notValidated');
        console.log("validated")
    } else {
        submitButton.classlist.add('notValidated');
        console.log("notvalidated")
    }

}

const allInputs = document.querySelectorAll(".main-form input")
allInputs.forEach(input => {
    console.log(input)
    input.addEventListener('change', validateOnInputChange);
    input.addEventListener('keyup', validateOnInputChange);
})