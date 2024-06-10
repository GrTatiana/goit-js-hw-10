import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import imageUrl1 from '../img/bi_check2-circle.svg';
import imageUrl2 from '../img/bi_x-octagon.svg';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('.inputDelay'),
};

refs.form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delay = event.target.delay.value;
  const status = event.target.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.show({
        backgroundColor: 'green',
        message: `Fulfilled promise in ${delay} ms`,
        messageColor: '#fff',
        messageSize: '16',
        imageWidth: 302,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#b51b1b',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        position: 'topRight',
        iconUrl: imageUrl1,
        iconColor: '#FAFAFB',
      });
    })
    .catch(delay => {
      iziToast.show({
        backgroundColor: 'red',
        message: `Rejected promise  in ${delay} ms`,
        iconUrl: imageUrl2,
        messageColor: '#fff',
        messageSize: '16',
        imageWidth: 302,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#b51b1b',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        position: 'topRight',
      });
    });
}
