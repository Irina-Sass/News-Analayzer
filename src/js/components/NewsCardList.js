export class NewsCardList {
    constructor(container, createCard, button, callback) {
        this.container = container;
        this.createCard = createCard;
        this.button = button;
        this.callback = callback;

        this._setEventListenersButton();
        this._setEventListenersСontainer();
    }

    render(arrCards) {
        arrCards.forEach(element => {
            const card = this.createCard({
                urlToImage: element.urlToImage,
                date: element.publishedAt,
                title: element.title,
                description: element.description,
                source: element.source.name,
                url: element.url
            });
            this.container.appendChild(card);           
        });
    }

    clear() {
        while (this.container.firstChild) {
            this.container.firstChild.remove();
        }
    }

    // метод считает количество карточек на странице 
    countNumberCards() {
        const cardsCount = (Array.from(this.container.children)).length;        
        return cardsCount;           
    }
 
    _setEventListenersButton() {
        this.button.addEventListener('click', this.callback); 
    }

    _setEventListenersСontainer() {
        this.container.addEventListener('click', (event) => {
            if  (event.target.closest('.card')) {
                const url = event.target.closest('.card').dataset.url;                  
                window.open(url);
              }            
        }); 
    }     
}
