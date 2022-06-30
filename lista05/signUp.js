window.onload = function () {
    $("#simpleModal").modal('show');
};

const button = document.getElementById("signupButton");
button.disabled = true;

function checkButton(option) {
    option ? button.disabled = false : button.disabled = true;
}

function signup() {
    document.getElementById("floatingNameInput").value.length > 0 ? validateName(1) : validateName();
    checkEmail();
    document.getElementById("floatingPasswordInput").value.length >= 6 ? validatePassword(2) : validatePassword(0);
    document.getElementById("floatingRePasswordInput").value.length > 0 ? validatePassword(3) : validatePassword(4);
    document.getElementById("month").value > 0 ? validateDate(1, 0) : validateDate(0, 0);
    document.getElementById("day").value > 0 ? validateDate(1, 1) : validateDate(0, 1);
    document.getElementById("year").value > 0 ? validateDate(1, 2) : validateDate(0, 2);
}

function addValidation(object, space, obg, aux=0) {
    if (aux == 1) {
        space.innerHTML = null;
        object.classList.remove("is-invalid");
        object.classList.add("is-valid");
        return;
    }
    object.classList.remove("is-valid");
    object.classList.add("is-invalid");
    if (obg == 0) space.innerHTML = "Campo obrigatório.";
}

function validateName(option=0) {
    let name = document.getElementById("nameSpace");
    let input = document.getElementById("floatingNameInput");
    if (option == 1) {
        addValidation(input, name, 1, 1);
        return;
    }
    addValidation(input, name, 0);
}

function checkEmail() {
    const base = /^[^\s@()]+@[^\s@()]+\.[^\s@()]+$/;
    const email = document.getElementById("floatingEmailInput");
    let mail = document.getElementById("emailSpace");
    if (email.value.match(base)) {
        addValidation(email, mail, 0, 1);
        return;
    }
    if (email.value.length > 0) {
        mail.innerHTML = "E-mail inválido.";
        addValidation(email, mail);
        return;
    }
    addValidation(email, mail, 0);
}

function validatePassword(option) {
    let password = document.getElementById("passwordSpace");
    let input = document.getElementById("floatingPasswordInput");
    if (input.value.length > 0 && input.value.length < 6 && option < 3) option = 1;
    if (option == 0) {
        addValidation(input, password, 0);
        return;
    }
    if (option == 1) {
        password.innerHTML = "A senha deve ter no mínimo 6 caracteres";
        addValidation(input, password);
        return;
    }
    if (option == 2) {
        addValidation(input, password, 0, 1);
        return;
    }
    let repassword = document.getElementById("rePasswordSpace");
    let reinput = document.getElementById("floatingRePasswordInput");
    if (!reinput.value.length > 0) {
        addValidation(reinput, repassword, 0);
        return;
    }
    if (input.value != reinput.value) {
        repassword.innerHTML = "As senhas não estão iguais.";
        addValidation(reinput, repassword);
        return;
    }
    addValidation(reinput, repassword, 0, 1);
}

function validateDate(check, which) {
    let date = null;
    let space = null;
    switch (which) {
        case 0:
            date = document.getElementById("month");
            space = document.getElementById("monthSpace")
            break;
        case 1:
            date = document.getElementById("day");
            space = document.getElementById("daySpace")
            break;
        case 2:
            date = document.getElementById("year");
            space = document.getElementById("yearSpace")
            break;
    }
    if (check == 1) {
        addValidation(date, space, 1, 1);
        return;
    }
    addValidation(date, space, 0);
}

function identificarOpcao(select00, select01, opt) {
    let select02 = document.getElementById("year");
    let days = new Date(2000, 2, 0).getDate();

    if (opt == 1) {
        select01.options.length = 0;
        select02.options.length = 0;
        disabled(select01);
        for (i = 1; i <= days; i++) {
            alterarSelect(select01, i, i);
        }
    }

    else if (select00.value == 2 && select01.value == 29) {
        select02.options.length = 0;
        disabled(select02);
        for (i = 0; i < leap.length; i++) {
            alterarSelect(select02, leap[i], leap[i]);
        }
    }
    else {
        select02.options.length = 0;
        disabled(select02);
        for (i = 1901; i < 2023; i++) {
            alterarSelect(select02, i, i);
        }
    }
}   

function alterarSelect(select, text, value) {
    let opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    select.options.add(opt);
}

function disabled(select, value='0') {
    let disabled = document.createElement('option');
    disabled.setAttribute("disabled", "disabled");
    disabled.value = value;
    disabled.selected = true;
    select.options.add(disabled);
}   

const leap = ['1904', '1908', '1912', '1916', '1920', '1924', 
            '1928', '1932', '1936', '1940', '1944', '1948', 
            '1952', '1956', '1960', '1964', '1968', '1972', 
            '1976', '1980', '1984', '1988', '1992', '1996', 
            '2000', '2004', '2008', '2012', '2016', '2020']