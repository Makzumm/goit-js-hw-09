import Notiflix, { Notify } from 'notiflix';

const refs = {
  delayValue: document.querySelector('input[name=delay]'),
  stepValue: document.querySelector('input[name=step]'),
  amountValue: document.querySelector('input[name=amount]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onForm)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}

function onForm(evt) {
  evt.preventDefault();

  const delayValue = +refs.delayValue.value
  const stepValue = +refs.stepValue.value;

  for (let i = 0; i <= refs.amountValue.value; i += 1){

    const delayPerStep = delayValue + stepValue * i;

    createPromise(i, delayPerStep)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }  
}

