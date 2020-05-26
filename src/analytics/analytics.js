import './analytics.css';
import { DataStorage } from '../js/modules/DataStorage.js';
import { Statistics } from '../js/components/Statistics.js';
import { getNumberResultsArticle } from '../js/utils/array.js'
import { NEWS_DAYS_DEPTH, DATA_STORAGE_ARTICLES_KEY, DATA_STORAGE_QUERY_KEY, FIELD_TITLE } from '../js/constants/commonConstants.js'

const searchQuery = document.querySelector('.info__title-search-query');
const totalNumberResults = document.querySelector('.text__total-number-results');
const numberResultsHeaders = document.querySelector('.text__number-results-headers');
const month = document.querySelector('.table__analytics-month');
const container = document.querySelector('.table__rows');
const dataStorage = new DataStorage();

// функция получает ключевое слово
function getSearchQuery() {
    return dataStorage.getDataStorage(DATA_STORAGE_QUERY_KEY);
}

function getTotalNumberResults(arr) {
    if (arr) {
        return arr.length;
    }
}

const articles = dataStorage.getDataStorage(DATA_STORAGE_ARTICLES_KEY);
const query = getSearchQuery();
const statistics = new Statistics({
    arr: articles,
    query,
    month,
    container
});

searchQuery.textContent = query;
totalNumberResults.textContent = getTotalNumberResults(articles);
numberResultsHeaders.textContent = getNumberResultsArticle(query, articles, FIELD_TITLE);
statistics.renderStatistic(NEWS_DAYS_DEPTH); 
