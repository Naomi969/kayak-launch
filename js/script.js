var john = document.querySelector('#john');
var order = document.querySelector('#order');
var userInput = document.querySelector('#userInput')




john.addEventListener('click', updateorder);

function updateorder (event) {
  if (john.value === 'click') {
    order.textContent = userInput;
  } else {
    john.value = 'Start machine';
    order.textContent = #userInput;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button - machine is stopped indeed.

