const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display = calculator.querySelector('.calculator_display')
const operatorKeys = keys.querySelectorAll('[data-type="operator"]')

keys.addEventListener('click', event => {
  if (!event.target.closest('button')) return

  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const { type } = key.dataset
  const { previousKeyType } = calculator.dataset

  if (type === 'number') {
    if (
      displayValue === '0' ||
      previousKeyType === 'operator'
    ) {
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }
  }

  if (type === 'operator') {
    operatorKeys.forEach(el => { el.dataset.state = '' })
    key.dataset.state = 'selected'

    calculator.dataset.firstNumber = displayValue
    calculator.dataset.operator = key.dataset.key
  }

  if (type === 'clear') {
    display.textContent = '0'
    delete calculator.dataset.firstNumber
    delete calculator.dataset.operator
  }

  if (type === 'equal') {
    // Performing a calculation
    const firstNumber = calculator.dataset.firstNumber
    const operator = calculator.dataset.operator
    const secondNumber = displayValue
    display.textContent = calculate(firstNumber, operator, secondNumber)
  }
    calculator.dataset.previousKeyType = type
})

    function calculate (firstNumber, operator, secondNumber) {
        firstNumber = parseInt(firstNumber)
        secondNumber = parseInt(secondNumber)
  
            if (operator === 'plus') return firstNumber + secondNumber
            if (operator === 'minus') return firstNumber - secondNumber
            if (operator === 'times') return firstNumber * secondNumber
            if (operator === 'divide') return firstNumber / secondNumber
  }

    function clearCalculator() {
        const clearKey = document.querySelector('[data-type="clear"]');
        clearKey.click();

        operatorKeys.forEach(key => {key.dataset.state = ''})
}


