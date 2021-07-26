import view from "./views";
import icons from 'url:../../img/icons.svg';


class addRecipeView extends view{
    parentElement = document.querySelector('.upload');
    successMessage = 'Recipe Was Sucessfully Uploaded';
    windowElement = document.querySelector('.add-recipe-window');
    overlayElement = document.querySelector('.overlay');
    btnOpen = document.querySelector('.nav__btn--add-recipe');
    btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super();
        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
    }

    toggleWindow(){
        this.windowElement.classList.toggle('hidden');
        this.overlayElement.classList.toggle('hidden');
    }

    addHandlerShowWindow(){
        this.btnOpen.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerCloseWindow(){
        this.btnClose.addEventListener('click',this.toggleWindow.bind(this));
        this.overlayElement.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this.parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }

    _generateMarkup(){
        
    }

}

export default new addRecipeView();