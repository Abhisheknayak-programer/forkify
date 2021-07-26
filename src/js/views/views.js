import icons from 'url:../../img/icons.svg';
export default class view{
    data;

    render(data){
        if(!data || Array.isArray(data) && data.length === 0) return this.renderError();
        this.data = data;
        const markup = this._generateMarkup();
        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    update(data){
        this.data = data;
        const NewMarkup = this._generateMarkup();

        let newDom = document.createRange().createContextualFragment(NewMarkup);
        let newElements = Array.from(newDom.querySelectorAll('*'));
        let currentElement = Array.from(this.parentElement.querySelectorAll('*'));

        newElements.forEach((newEl,index)=>{
            let curEl = currentElement[index];
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
                curEl.textContent = newEl.textContent;
            }

            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(Attr => curEl.setAttribute(Attr.name,Attr.value))
            }
        })        
    }

    _clear(){
        this.parentElement.innerHTML = '';
    }

    LoadSpinner(){
        const markup = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
        </div>`;
        this.parentElement.innerHTML = '';
        this.parentElement.insertAdjacentHTML('afterbegin',markup);
    }


    renderError(ErrorMessage = this.errorMessage){
        const markup = ` 
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${ErrorMessage}</p>
            </div>`;

        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin',markup);   
    }

    renderSuccess(SuccessMessage = this.successMessage){
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${SuccessMessage}</p>
        </div>`;

        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin',markup);   
    }

}