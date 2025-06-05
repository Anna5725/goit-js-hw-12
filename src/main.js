import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import {getImagesByQuery} from './js/pixabay-api.js';
import {createGallery, clearGallery,  showLoader,  hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e =>{
    e.preventDefault();

 query = e.target.elements['search-text'].value.trim();
 page = 1;
if(!query){
    iziToast.Toast.warning({
        message: 'Please enter a search query.', 
        position: 'topRight'
    });
    return;
}
clearGallery();
hideLoadMoreButton();
showLoader();

try{
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    if(data.hits.length === 0){
        iziToast.error({
            message:'Sorry, there are no images matching your search query.',
            position: 'topRight',
        });
        return;
    } 
      createGallery(data.hits);
    if (totalHits > 15) {
        showLoadMoreButton();
    }
} catch (error){
    iziToast.error({
        message:'Something went wrong. Please try again later.',
        position: 'topRight',
    });
} finally {
    hideLoader();
}
});

loadMoreBtn.addEventListener ('click', async ()=> {
    page += 1;
    showLoader();

try {
    const data = await getImagesByQuery (query, page);
    createGallery(data.hits);
    const image = document.querySelector('.gallery-item');
    const imageHeight = image.getBoundingClientRect().height;
    window.scrollBy({top:imageHeight * 2, behaviouur:'smooth'});
    const loadedImages = document.querySelectorAll('.gallery-item').length;
    if (loadedImages >=totalHits){
        hideLoadMoreButton();
        iziToast.error({
            message:'We are sorry, but you have reached the end of search results.',
        });
    }
}catch (error){
    iziToast.error({
        message:'Failed to load more images.',
    });
}finally{
    hideLoader();
}
});
