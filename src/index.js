import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from '../fetchCountries.js';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

// fetchCountries();

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/all';

  fetch(
    `${BASE_URL}?fields=&name.official=${item.name}&capita=${item.capital}l&population=${item.population}&flags.svg=${item.flags.svg}&languages=${languages}`
  );
}

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
