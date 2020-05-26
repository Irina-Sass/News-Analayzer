import {formatDateFull} from '../utils/date.js';
export class NewsCard {   

    create({urlToImage, date, title, description, source, url}) {    
        const _template = document.createElement('div');
        _template.insertAdjacentHTML('beforeend', `
            <div class="card">
                <div class="card__image"></div>
                <div class="card__data">
                    <p class="card__date">2 августа, 2019</p>
                    <h3 class="title title_small card__title"></h3>
                    <p class="text card__text"></p>
                    <a href="https://lenta.ru/" target="_blank" class="link card__link">Лента.ру</a>
                </div>
            </div>`);
        const card = _template.firstElementChild;        
        if (!urlToImage) {
            urlToImage = './images/news-img-default.jpg';
        }
        card.querySelector('.card__image').style.backgroundImage = `url(${urlToImage})`;
        card.querySelector('.card__date').textContent = formatDateFull(date);        
        card.querySelector('.card__title').textContent = title;
        card.querySelector('.card__text').textContent = description;
        card.querySelector('.card__link').textContent = source;
        card.querySelector('.card__link').setAttribute ('href', url);
        card.setAttribute('data-url', url);
            
        return card;
    }
}