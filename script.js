const display = document.getElementById('display')
const nums = Array.from(document.getElementsByClassName('num'))
const operators = Array.from(document.getElementsByClassName('operation'))
const clear = Array.from(document.getElementsByClassName('clear'))
let n1 = ""
let n2 = ""
let operator = ""
let allOperators = ["+", "-", "/", "*"]
let newNumber = true
let hasDot = false

const addNum = (e) => {
    if (newNumber) {
        if (!hasDot) {
            display.innerText = ""
        }
        display.innerText += e.target.innerText
        newNumber = false
    } else {
        display.innerText += e.target.innerText
    }
    checkFirstDigit()
}

const addDot = () => {
    checkLastDigit()
    checkDot()
    if (!hasDot) {
        display.innerText += this.event.target.innerText
        hasDot = true
    }
}

const checkDot = () => {
    if (display.innerText.includes(".")) {
        hasDot = true
    } else {
        hasDot = false
    }
}

const addOperator = (e) => {
    checkLastDigit()
    n1 = display.innerText
    operator = e.target.innerText
    display.innerText += e.target.innerText
    newNumber = true
    hasDot = false
}

const checkLastDigit = () => {
    if (allOperators.includes(display.innerText[display.innerText.length - 1])) {
        if(this.event.target.innerText == "."){
            display.innerText = display.innerText.slice(0, -1)
        } else if(allOperators.includes(this.event.target.innerText)) {
            display.innerText = display.innerText.slice(0, -1)
        }
    } else if(display.innerText[display.innerText.length - 1] == ".") {
        if(allOperators.includes(this.event.target.innerText)) {
            display.innerText = display.innerText.slice(0, -1)
        } else if(this.event.target.innerText == ".") {
            display.innerText = display.innerText.slice(0, -1)
        }
    }
}

const checkFirstDigit = () => {   
    if (display.innerText[0] == 0 && !hasDot) {
        display.innerText = display.innerText.slice(0, -1)
        display.innerText = 0
    }
}

const clearAll = () => {
    n1 = ""
    n2 = ""
    operator = ""
    display.innerText = 0
    newNumber = true
    hasDot = false
}

const backSpace = () => display.innerText = display.innerText.slice(0, -1)

function calculate() {
    n2 = display.innerText
    result = eval(`${n1}${operator}${n2}`).toFixed(2).replace(".00", "")
    display.innerText = result
    result.includes(".") ? hasDot = true : hasDot = false
}

nums.forEach(num => {
    num.addEventListener("click", addNum)
})

operators.forEach(operator => {
    operator.addEventListener("click", addOperator)
})