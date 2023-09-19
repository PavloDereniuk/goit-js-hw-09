import Notiflix from 'notiflix';
const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

let delay = 0;

function onSubmit(event) {
  event.preventDefault();
  let delayStart = parseInt(form.delay.value);
  let position = parseInt(form.amount.value);
  let step = parseInt(form.step.value);

  if (delayStart < 0 || position < 0 || step <= 0) {
    return Notiflix.Notify.failure(
      'Data entered incorrectly. Please re-enter the data'
    );
  } else {
    for (let i = 1; i <= position; i += 1) {
      delay = delayStart + step * (i - 1);
      createPromise(i, delay)
        .then(message => {
          Notiflix.Notify.success(message);
        })
        .catch(message => {
          Notiflix.Notify.failure(message);
        });
    }
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
