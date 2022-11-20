import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetch-countries';

const DEBOUNCE_DELAY = 300;

const refs = {
  countruInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.countruInput.addEventListener(
  'input',
  debounce(onCauntryInput, DEBOUNCE_DELAY)
);

function onCauntryInput() {
  const name = refs.countruInput.value.trim();
  if (name === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }

  fetchCountries(name)
    .then(countries => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      if (countries.length === 1) {
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          marcupCountryList(countries)
        );
        refs.countryInfo.insertAdjacentHTML(
          'beforeend',
          marcupCountryInfo(countries)
        );
      } else if (countries.length >= 10) {
        alertTooManyMatches();
      } else {
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          marcupCountryList(countries)
        );
      }
    })
    .catch(alertWrongName);
}

function marcupCountryList(countries) {
  const marcup = countries
    .map(({ name, flags }) => {
      return `<li class="country-list__item" >
    <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px  height = 30px />
    <h2 class="country-list__name">${name.official}</h2>
    <li/>`;
    })
    .join('');
  return marcup;
}

function marcupCountryInfo(countries) {
  const marcup = countries
    .map(({ capital, population, languages }) => {
      return `<ul class="countri-info__list">
    <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
    <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
    <li class="country-info__item"><p><b>Languages: </b>${Object.values(
      languages
    ).join(', ')}</p></li>
    </ul>`;
    })
    .join('');
  return marcup;
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
