import view from "./views";
import icons from 'url:../../img/icons.svg';


class paginationView extends view{
    parentElement = document.querySelector('.pagination');
    

    addEventClicked(handler){
        this.parentElement.addEventListener('click',(event)=>{
            const btnClicked = event.target.closest('.btn--inline');
            if(!btnClicked) return;
            const goToPage = +btnClicked.dataset.goto;
            handler(goToPage);
        })
    }


    _generateMarkup(){
        let TotalNumPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);
        let currentpage = this.data.page;

        // Page 1 and there are other pages
        if(currentpage === 1 && TotalNumPages > 1){
            return `
            <button data-goto="${currentpage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentpage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
          </button>`;
        }
        
        // Last Page
        if(currentpage === TotalNumPages && TotalNumPages > 1){
            return `
            <button data-goto="${currentpage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentpage - 1}</span>
          </button>`;
        }
        
        // Some Other Pages
        if(currentpage < TotalNumPages){
            return `
            <button data-goto="${currentpage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentpage - 1}</span>
            </button>

            <button data-goto="${currentpage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentpage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
        }

        // Page 1 and there are no pages
        return 'one page only'
    }

}

export default new paginationView();