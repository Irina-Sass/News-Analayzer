import './index.css';
import img from '../images/news-img-default.jpg';
import { NewsApi } from '../js/modules/NewsApi.js';
import { DataStorage } from '../js/modules/DataStorage.js';
import { SearchInput } from '../js/components/SearchInput.js';
import { NewsCard } from '../js/components/NewsCard.js';
import { NewsCardList } from '../js/components/NewsCardList.js';
import { determineDate } from '../js/utils/date.js';
import {
  PAGE_SIZE,
  LANGUAGE,
  SORT_BY,
  API_KEY,
  CARDS_FOR_VIEW,
  NOTHING_FOUND_TITLE,
  NOTHING_FOUND_TEXT,
  ERROR_TITLE,
  ERROR_TEXT,
} from '../js/constants/indexConstants.js';
import {
  NEWS_DAYS_DEPTH,
  DATA_STORAGE_ARTICLES_KEY,
  DATA_STORAGE_QUERY_KEY,
  FROM,
  TO,
} from '../js/constants/commonConstants.js';

const form = document.querySelector('.search__form');
const elementInput = form.querySelector('.search__field');
const buttonSubmit = form.querySelector('.search__button');
const preloader = document.querySelector('.preloader');
const error = document.querySelector('.error');
const result = document.querySelector('.result');
const errorTitle = error.querySelector('.title');
const errorText = error.querySelector('.error__text');
const resultButton = document.querySelector('.result__button');
const newsApi = new NewsApi(API_KEY, BASE_URL);
const dataStorage = new DataStorage();
const searchInput = new SearchInput(
  form,
  elementInput,
  buttonSubmit,
  searchNews
);
const createCard = ({ urlToImage, date, title, description, source, url }) => {
  const newsCard = new NewsCard();
  return newsCard.create({ urlToImage, date, title, description, source, url });
};
const newsCardList = new NewsCardList(
  document.querySelector('.cards'),
  createCard,
  resultButton,
  showMoreCardsCallback
);

function showMoreCardsCallback() {
  showMoreCards(CARDS_FOR_VIEW);
}
// функция отображает или скрывает указанный блок
function displayElement(element, display) {
  if (display) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

// функция вностит нужный текст в блок error в зависимости от ответа сервера
function writeErrorBlock(title, text) {
  errorTitle.textContent = title;
  errorText.textContent = text;
}

// функция скрывает/отображает кнопку в зависимости от количества карточек, оставшихся для вывода
function showMoreButton(cardsCount, arrayCards, cardsForView) {
  if (cardsCount + cardsForView >= arrayCards.length) {
    displayElement(resultButton, false);
  } else {
    displayElement(resultButton, true);
  }
}

// функция отображает по три карточки
function showMoreCards(cardsForView) {
  const arrayCards = dataStorage.getDataStorage(DATA_STORAGE_ARTICLES_KEY);
  const cardsCount = newsCardList.countNumberCards();
  const cards = arrayCards.slice(cardsCount, cardsCount + cardsForView);
  newsCardList.render(cards);
  showMoreButton(cardsCount, arrayCards, cardsForView);
}

function searchNews(keyword) {
  const dateTo = new Date();
  const dateFrom = determineDate(dateTo, NEWS_DAYS_DEPTH);
  displayElement(error, false);
  displayElement(result, false);
  displayElement(preloader, true);
  newsCardList.clear();
  newsApi
    .getNews(
      keyword,
      dateFrom.toISOString(),
      dateTo.toISOString(),
      PAGE_SIZE,
      LANGUAGE,
      SORT_BY
    )
    .then((data) => {
      if (data.articles.length > 0) {
        dataStorage.setDataStorage(DATA_STORAGE_ARTICLES_KEY, data.articles);
        dataStorage.setDataStorage(DATA_STORAGE_QUERY_KEY, keyword);
        dataStorage.setDataStorage(FROM, dateFrom.getTime());
        dataStorage.setDataStorage(TO, dateTo.getTime());
        showMoreCards(CARDS_FOR_VIEW);
        displayElement(result, true);
      } else {
        writeErrorBlock(NOTHING_FOUND_TITLE, NOTHING_FOUND_TEXT);
        displayElement(error, true);
      }
    })
    .catch((err) => {
      console.log(err);
      writeErrorBlock(ERROR_TITLE, ERROR_TEXT);
      displayElement(error, true);
    })

    .finally(() => {
      displayElement(preloader, false);
      searchInput.toggleFormState(true);
    });
}

function loadSavedResults() {
  if (dataStorage.getDataStorage(DATA_STORAGE_QUERY_KEY)) {
    elementInput.value = dataStorage.getDataStorage(DATA_STORAGE_QUERY_KEY);
  }

  if (dataStorage.getDataStorage(DATA_STORAGE_ARTICLES_KEY)) {
    showMoreCards(CARDS_FOR_VIEW);
    displayElement(result, true);
  }
}
loadSavedResults();
