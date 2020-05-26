export class SearchInput {
    constructor(form, element, buttonSubmit, callback) {
        this.element = element;
        this.buttonSubmit = buttonSubmit;
        this.form = form;
        this.callback = callback;

        this._setEventListenersInput();
        this._setEventListenersSubmit();

    }
    
    //валидации поля
    _checkInputValidity() {
        const errorElement = this.element.nextElementSibling;
        const errorMessages = 'Нужно ввести ключевое слово'
        if (!this.element.checkValidity()) {
            errorElement.textContent = errorMessages;
        } else {
            errorElement.textContent = '';
        }
    }

    //метод активирует/дезактивирует форму
    _toggleFormState(flag) {
        if (!flag) {
            this.element.setAttribute('disabled', true);
            this.buttonSubmit.setAttribute('disabled', true);
            this.buttonSubmit.classList.remove('search__button_active');
        } else {
            this.element.removeAttribute('disabled');
            this.buttonSubmit.removeAttribute('disabled');
            this.buttonSubmit.classList.add('search__button_active');
        }    
    }

    //добавление обработчика на поле формы
    _setEventListenersInput() {
        this.element.addEventListener('input', () => {
            this._checkInputValidity();            
        });        
    }
    
    _setEventListenersSubmit() {
        this.form.addEventListener('submit', (event) => { 
            event.preventDefault();
            this._checkInputValidity();
            if (this.element.checkValidity()) {
                this._toggleFormState(false);
                this.callback(this.element.value);
                this._toggleFormState(true);
            }             
        })    
    }    
}