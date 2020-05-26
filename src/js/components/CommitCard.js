import {formatDateFull} from '../utils/date.js';
export class CommitCard {

    create({name, email, date, message, avatarUrl}) {
        const template = document.createElement('div');
        template.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide commit">
                <p class="commit__date"></p>
                <div class="commit__commiter">
                    <img alt="фото автора" class="commit__commiter-avatar">
                    <div class="commit__commiter-info">
                        <h3 class="title title_small commit__title"></h3>
                        <p class="commit__commiter-email"></p>
                    </div>
                </div>
                <p class="text commit__message"></p>
            </div>`);
        const card = template.firstElementChild;               
        card.querySelector('.commit__date').textContent = formatDateFull(date);
        card.querySelector('.commit__commiter-avatar').setAttribute('src', avatarUrl);        
        card.querySelector('.commit__title').textContent = name;
        card.querySelector('.commit__commiter-email').textContent = email;
        card.querySelector('.commit__message').textContent = message;
        return card;
    }
}