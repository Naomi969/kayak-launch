var john = document.querySelector('#john');
var order = document.querySelector('#order');




john.addEventListener('click', updateorder);

function updateorder (event) {
  if (john.value === 'click') {
    john.value = 'click';
    console.log('john');
  } else {
    john.value = 'Start machine';
    order.textContent = 'The machine is stopped.';
  }
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button - machine is stopped indeed.

