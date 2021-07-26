import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import PaginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import addrecipeView from './views/addrecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Loading The recipe
const controlRecipe = async () =>{
 try {
   const id = window.location.hash.slice(1);

  if(!id) return;
  recipeView.LoadSpinner();

  // 1. Update Result View To Mark Selected
  resultsView.update(model.getTenSearchResults()); 
  bookmarksView.update(model.state.bookmarks);

  // 2. Loading Recipe
  await model.loadRecipe(id);

  // 3. Rendering the recipe
  RecipeView.render(model.state.recipe);
} catch (error) {
    recipeView.renderError();
 }
}



const SearchResultsController = async function(){
  try {
    resultsView.LoadSpinner();

    // 1. Get Search Query
    const SearchQuery = SearchView.getQuery();
    if(!SearchQuery) return;

    // 2. Load Search Query
    await model.LoadSearchResults(SearchQuery);

    // 3. Render Results (By Default 1 Page Rendered)
    resultsView.render(model.getTenSearchResults());

    // 4. Render Pagination
    PaginationView.render(model.state.search);
  } catch (error) {

  }
}
// SearchResultsController();

const controlPagination = function(goToPage){
  console.log(goToPage);
  // 1. Render New Page Items
  resultsView.render(model.getTenSearchResults(goToPage));

  // 2. Render New Paginantions
  PaginationView.render(model.state.search);
}


const controlServings = function(newServings){
  // Updating the Recipe Servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  RecipeView.update(model.state.recipe);
}


const controlBookmark = function(){
  // 1. Add or remove Bookmarks
  if(!model.state.recipe.bookmarked){
    model.AddBookMark(model.state.recipe);
  }else{
    model.deleteBookMark(model.state.recipe.id);
  } 

  // 2. Update the recipe view
  recipeView.update(model.state.recipe);

  // 3. Rendering the bookmarks
  bookmarksView.render(model.state.bookmarks)
}


const controlBookmarkOnLoad = function(){
  bookmarksView.render(model.state.bookmarks);
}


const controlAddRecipe =  async function(newRecipe){
  try {
  // Loading Spinner Render
    addrecipeView.LoadSpinner();

  // Uploading Data
   await model.uploadRecipe(newRecipe);
   console.log(model.state.recipe);

  // Rendering Recipe
    recipeView.render(model.state.recipe);

  // Success Message 
    addrecipeView.renderSuccess();

  // Render Bookmark
    bookmarksView.render(model.state.bookmarks);

  // Change Hash In URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

  // Close Form Window
  // setTimeout(function(){
  //   // addrecipeView.toggleWindow();
  // },2500);

} catch (err) {
   addrecipeView.renderError(err.message);
 }
} 

const init = function(){
  bookmarksView.addLoadWindowBookmarkhandler(controlBookmarkOnLoad);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  SearchView.addHandlerSearch(SearchResultsController);
  PaginationView.addEventClicked(controlPagination);
  addrecipeView.addHandlerUpload(controlAddRecipe);
}
init();