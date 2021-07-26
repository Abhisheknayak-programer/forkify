import icons from 'url:../../img/icons.svg';
import view from './views';

class BookMarksView extends view{
    parentElement = document.querySelector('.bookmarks__list');
    errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    successMessage = '';


    addLoadWindowBookmarkhandler(handler){
        window.addEventListener('load',handler);
    }

    _generateMarkup(){
        return this.data.map(this._generateMarkupPreview).join('');
     }

    _generateMarkupPreview(item){
        const id = window.location.hash.slice(1);

        return `
            <li class="preview">
                <a class="preview__link ${item.id === id ? 'preview__link--active' : ''}" href="#${item.id}">
                    <figure class="preview__fig">
                        <img src="${item.image}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                    </div>
                </a>
            </li>`;
    }

}

export default new BookMarksView();