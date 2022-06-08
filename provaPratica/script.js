function identificarOpcao(select01,select02) {
    let Aviao = ['Internacional', 'Nacional'];
    let Onibus = ['Interestadual', 'Intermunicipal', 'Municipal'];


    if (select01.value == 'Onibus') {
            select02.options.length = 0; 
        for (i = 0; i < Onibus.length; i++) {
            alterarSelect02(select02, Onibus[i], Onibus[i]);
            }
    }

    else {
        select02.options.length = 0;
            for (i = 0; i < Aviao.length; i++) {
                alterarSelect02(select02, Aviao[i], Aviao[i]);
            }
    }
}

function alterarSelect02(select, text, value) {
    let opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    select.options.add(opt);
}


let saldo = parseInt(document.getElementById('saldo').innerHTML);
var travels = parseInt(document.getElementById("travelsNumber").innerHTML);
var pointsSpent = parseInt(document.getElementById("pointsSpent").innerHTML);

function addInTable(meioTransporte, tipoViagem, idaVolta, price) {
    var table = document.getElementById("table");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = meioTransporte;
    cell2.innerHTML = tipoViagem;
    if (idaVolta == 2) cell3.innerHTML = 'Sim';
    else cell3.innerHTML = 'Não';
    cell4.innerHTML = price
}


function getInformation(event) {
    event.preventDefault();

    let meioTransporte = document.getElementById('select00').value;
    let tipoViagem = document.getElementById('select02').value;

    if (meioTransporte == 'Onibus') meioTransporte = 'Ônibus';
    else meioTransporte = 'Avião';

    if (document.getElementById('idaVolta').checked) var idaVolta = 2;
    else var idaVolta = 1;

    var price = null;
    switch (tipoViagem) {
        case 'Interestadual':
            price = 150*idaVolta;
            break;
        case 'Intermunicipal':
            price = 50*idaVolta;
            break;
        case 'Municipal':
            price = 25*idaVolta;
            break;
        case 'Internacional':
            price = 5000*idaVolta;
            break;
        case 'Nacional':
            price = 500*idaVolta;
            break;
    }
    
    if (saldo < price) {
        alert('Saldo insuficiente');
        if (saldo < 25) document.getElementById("button").disabled = true;
        return;
    } 
    
    saldo -= price;
    document.getElementById('saldo').innerHTML = saldo;

    if (price != null) addInTable(meioTransporte, tipoViagem, idaVolta, price);
    travels++;
    pointsSpent += price;

    document.getElementById("travelsNumber").innerHTML = travels;
    document.getElementById("pointsSpent").innerHTML = pointsSpent;
}

