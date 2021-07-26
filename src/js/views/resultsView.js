import icons from 'url:../../img/icons.svg';
import view from './views';

class resultsView extends view{
    parentElement = document.querySelector('.results');
    errorMessage = 'No recipes found according to your query! please try again ;)';
    successMessage = '';

    _generateMarkup(){
        return this.data.map(this._generateMarkupPreview).join('');
     }

    _generateMarkupPreview(item){
        const id = window.location.hash.slice(1);

        return `
            <li class="preview">
                <a class="preview__link ${item.id === id ? 'preview__link--active' : ''}" href="#${item.id}">
                    <figure class="preview__fig">
                        <img src="${item.image_url}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                    </div>
                </a>
            </li>`;
    }

}

export default new resultsView();