import {determineDate, convertDateToUTC, getMonthString, formatDateShort} from '../utils/date.js';
import {getNumberResultsArticle} from '../utils/array.js'
import {FIELD_TITLE, FIELD_DESCRIPTION} from '../constants/commonConstants.js'

export class Statistics {
    constructor({arr, query, month, container}) {
        this.arr = arr;
        this.query = query;
        this.month = month;
        this.container = container
    }

    // метод возвращает массив сгруппированных по датам новостей 
    _groupNewsDay(newsDaysDepth) {
        const arr = [];
        for (let days = 0; days <= newsDaysDepth; days++) {
            const statisticDay = determineDate(days);
            statisticDay.setHours(0, 0, 0, 0);
            arr.push({date: statisticDay, articles: [], keywordCount: 0});                      
        }
        this.arr.forEach(item => {
            const publishedDay = convertDateToUTC(new Date(item.publishedAt));
            publishedDay.setHours(0, 0, 0, 0);           
            let dateStatistics = arr.find(elem => Date.parse(elem.date) === Date.parse(publishedDay));
            if (dateStatistics) {
                dateStatistics.articles.push(item);
            }                          
        });
        return arr;
    }

    // метод добавляет количество упоминаний ключевого слова в заголовках и описании в массив 
    _calculateStatistics(arr) {        
        arr.forEach(element => {
            element.keywordCount += getNumberResultsArticle(this.query, element.articles, FIELD_TITLE);
            element.keywordCount += getNumberResultsArticle(this.query, element.articles, FIELD_DESCRIPTION);
        });        
        arr.reverse();
        return arr;
    }

    // метод возвращает общее количество упоминаний ключевого слова в заголовках и описании
    _calculatetheTotalCount(arr) {
       return arr.reduce((previousValue, item) => {
           return previousValue + item.keywordCount;
        },0)
    }

    // метод заполняет одну строку аналитики
    _fillRow(rowElem, day, count, totalCount) {
        const percent = Math.round((count*100)/totalCount);
        const bar = rowElem.querySelector('.table__bar');
        const  tableText = rowElem.querySelector('.table__text');
        bar.style.width = `${percent}%`;
        rowElem.querySelector('.date').textContent = formatDateShort(day);
        tableText.textContent = percent;
        if (count === 0) {          
            bar.classList.add('table__bar_inverted');
            tableText.classList.add('table__text_inverted');
        }   
    }    

    renderStatistic(newsDaysDepth) {
        const arr = this._calculateStatistics(this._groupNewsDay(newsDaysDepth));
        const totalKeywordCount = this._calculatetheTotalCount(arr);       
        this.month.textContent = `(${getMonthString(arr[0].date)})`; 
        const rowTemplate = this.container.querySelector('#row-template');
        arr.forEach(item => {            
            const rowFragment = rowTemplate.content.cloneNode(true);           
            const rowElem = rowFragment.querySelector('.table__row');            
            this._fillRow(rowElem, item.date, item.keywordCount, totalKeywordCount);
            this.container.appendChild(rowElem);
        });        
    }   
}