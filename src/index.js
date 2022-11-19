import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

function createMarcupCard(arr) {
  const markup = arr
    .map(
      item => `<img src="${item.flags.svg}" alt=""/>
  <h1 class="titel">${item.name}</h1>
  <div>
  <div class="field">
  <span class="label">Capital:</span>
  <span class="value" data-capital>${item.capital}</span>
  </div>
  <div class="field">
  <span class="label">Population:</span>
  <span class="value" data-population>${item.population}</span>
  </div>
  <div class="field">
  <span class="label">Languages:</span>
  <span class="value" data-languages>${languages
    .map(({ name }) => `<span>${name}</span>`)
    .join(', ')}</span>
  </div>
  </div>`
    )
    .join('');
  refs.list.innerHTML = markup;
}
