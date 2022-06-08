import autosize from "https://unpkg.com/autosize@4.0.2/src/autosize.js";

if (document.getElementById("butaoTzeet")) {
    document.getElementById("butaoTzeet").disabled = true;
    let tzeetou = document.getElementById("inputTzeet");
    tzeetou.addEventListener("input", getVars1);
}
  
document.getElementById("butaoModal").disabled = true;
let modou = document.getElementById("inputModal");
modou.addEventListener("input", getVars2);

function getVars1() {
    let number1 = document.getElementById("inputTzeet").value.length;
    let butao1 = document.getElementById("butaoTzeet");
    let count1 = document.getElementById("countTzeet");
    let remaining1 = 140 - number1;
    let choice1 = true;
    displayCount(number1, butao1, count1, remaining1, choice1);
}

function getVars2() {
    let number2 = modou.value.length;
    let butao2 = document.getElementById("butaoModal");
    let count2 = document.getElementById("countModal");
    let remaining2 = 140 - number2;
    let choice2 = false;
    displayCount(number2, butao2, count2, remaining2, choice2);
}

function displayCount(number, butao, count, remaining, choice) {
    count.remove();
    if (number == 0) {
        addElement(choice);
        butao.disabled = true;
        return;
    }
    
    addElement(choice, remaining);

    if (remaining < 0) butao.disabled = true;
    else butao.disabled = false;
}

function addElement (choice, remaining="") { 
    if (choice) {
        let newSpan = document.createElement("span");
        newSpan.id = "countTzeet";
        newSpan.innerHTML = remaining;
        if (remaining < 0) newSpan.setAttribute("class","red");
        else if (remaining < 40) newSpan.setAttribute("class","yellow");;
        document.getElementById("divTzeet").insertBefore(newSpan, document.getElementById("divTzeet").children[0]);
    }

    else {
        let newSpan = document.createElement("span");
        newSpan.id = "countModal";
        newSpan.innerHTML = remaining;
        if (remaining < 0) newSpan.setAttribute("class","red");
        else if (remaining < 40) newSpan.setAttribute("class","yellow");;
        document.getElementById("divModal").insertBefore(newSpan, document.getElementById("divModal").children[0]);
    }


}

// autosize definition in tzeet input
Array.from(document.querySelectorAll("textarea[autosize]"))
  .forEach(autosize);

new MutationObserver(mutations => {
  Array.from(mutations).forEach(mutation => {
    Array.from(mutation.addedNodes).forEach(node => {
      if (node.matches("textarea[autosize]")) {
        autosize(node);
      }
    });
  });
}).observe(document.body, { childList: true });