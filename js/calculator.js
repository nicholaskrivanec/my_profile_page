var buttonPressed = false;
var inputStr = " ";

window.addEventListener("load", addListeners);

function addListeners() {
    var calcButtons = document.getElementsByTagName("button");
    var size = calcButtons.length;

    for (var i = 0; i < size; i++) {
        calcButtons[i].addEventListener("click", addInput);
        calcButtons[i].addEventListener("focus", highlightButton);
        calcButtons[i].addEventListener("blur", unHighlight);
        calcButtons[i].addEventListener("mouseover", highlightBackground);
        calcButtons[i].addEventListener("mouseout", unhighlightBackground);
    }
}

function addInput() {
    var isNumKey = true;
    // the button is a number if it's not an operator or function
    isNumKey = (!isOperator(this.value) && !isFunctionButton(this.value));

    // if an answer is on display and the next button pressed is a number 
    if (buttonPressed && isNumKey == true) { clear(); }
    buttonPressed = false;

    // if 'C' 
    if (this.value == "C") { clear(); }

    // if '=' 
    else if(this.value == "=") { equals(inputStr); }

    // if "area" 
    else if (this.value == "area") { area(inputStr); }

    // if "x^2" 
    else if (this.value == "X^2") { squareNumber(inputStr); }

    // if "1/2" 
    else if (this.value == "1/2") { halfNumber(inputStr); }
    
    // otherwise, a number or operator button was pushed;
    else { inputStr += this.value; }

    // display the result of the button being pushed
    document.getElementById("output").innerHTML = inputStr;

    // if the window displays ERROR, the next button clicked should restart the input
    if (inputStr == "ERROR" || inputStr =="NaN" || inputStr == "Infinity" ) { inputStr = " "; }
}

function clear() {
    inputStr = " ";
    buttonPressed = false;
}

function equals() {
    // if there's no input
    if (inputStr == " ") { return; }

    // if there are any errors display "ERROR"
    if (syntaxError()) { inputStr = "ERROR"; }

    // else, try to evaluate the expression
    else {
        try {
            var outputVal = eval(inputStr);

            if (outputVal == "Infinity" || outputVal =="NaN") {
                outputVal = "ERROR";
            }
            inputStr = outputVal;
            buttonPressed = true;
        }
        catch (e) {
            inputStr = "ERROR";
        }
    }
}

function squareNumber(str) {
    try{
        var num = eval(inputStr); // convert the string to a number
        num *= num;               // multiply that number by itself
        inputStr = num;           // change the string's value to the evaluated number
        buttonPressed = true;
        return num;               // return the value for other area function to use
    }
    catch (e) {
        inputStr = "ERROR";
    }
}

function halfNumber(str) {
    try{
        var num = eval(inputStr); // convert the string to a number
        num /= 2;                 // divide the number by 2
        inputStr = num;           // change the string's value to the evaluated number
        buttonPressed = true;
    }
    catch (e) {
        inputStr = "ERROR";
    }
}

function area(str) {
    try{
        var pi = Math.PI;
        var area = pi * squareNumber(inputStr); // pi(r)(r)
        inputStr = area.toFixed(2);
        buttonPressed = true;
    }
    catch (e) {
        inputStr = "ERROR";
    }
}

function isOperator(char){
    if (char == '+' || char == '-' || char == '*' || char == '/' || char =='='){
        return true;
    }
    return false;
}

function isFunctionButton(str) {
    if (str == "area" || str == "X^2" || str == "1/2" || str =="C") {
        return true;
    }
    return false;
}

function syntaxError() {
    if (inputStr == " " ) { return false; }

    if (inputStr == undefined) { return true; }

    for (var i = 0; i < (inputStr.length - 1) ; i++) {
        // if there are two operator symbols in a row
        if (isOperator(inputStr.charAt(i)) && isOperator(inputStr.charAt(i + 1))) {
            return true;
        }
    }
    return false;
}

function highlightButton(){
    document.getElementById(this.id).style.border = "solid 2px #83E783";
}

function unHighlight() {
    document.getElementById(this.id).style.border = "solid 2px #046F6F";
}

function highlightBackground(){
    document.getElementById(this.id).style.backgroundColor = "#76CFCF";
}

function unhighlightBackground() {
    document.getElementById(this.id).style.backgroundColor = "#289999";
}



