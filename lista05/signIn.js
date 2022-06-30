let email = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");
let button = document.getElementById("button");
email.addEventListener("input", enableButton);
password.addEventListener("input", enableButton);

button.disabled = true;

function enableButton() {
    if ((email.value.length > 0) && (password.value.length > 0))
        button.disabled = false;
    else 
        button.disabled = true;
}

function login() {
    if (document.getElementById("invalidEmail")) {
        document.getElementById("invalidEmail").parentElement.removeChild(document.getElementById("invalidEmail"));
    }
    password.classList.add("is-valid");
    if(!checkEmail()) isInvalid();

}

function checkEmail() {
    const base = /^[^\s@()]+@[^\s@()]+\.[^\s@()]+$/;
    if (email.value.match(base)) {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        return true;
    }
    else return false;
}

function isInvalid() {
    email.classList.add("is-invalid");
    let newSpan = document.createElement("span");
    newSpan.id = "invalidEmail";
    newSpan.innerHTML = "Informe um email válido.";
    newSpan.setAttribute("class","text-danger");;
    document.getElementById("emailSpace").insertBefore(newSpan, document.getElementById("emailSpace").children[0]);
}