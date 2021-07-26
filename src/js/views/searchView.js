class searchView{
    parentElement = document.querySelector('.search');

    getQuery(){
        return this.parentElement.querySelector('.search__field').value;
    }

    addHandlerSearch(Handler){
        this.parentElement.addEventListener('submit',(event)=>{
            event.preventDefault();
            Handler();
            this.parentElement.querySelector('.search__field').value = '';
        })
    }
}

export default new searchView();