import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const photoGallery = document.querySelector ('.gallery');
const loadMoreBtn = document.querySelector ('.load-more')
const loader = document.getElementById ('loader');
const lightbox = new SimpleLightbox('.gallery a');
export function createGallery(images){
const markup = images
.map(({webformatURL,largeImageURL, tags, likes, views, comments, downloads}) =>
`<li class = 'gallery-item'>
<a href = "${largeImageURL}">
    <img src = "${webformatURL}" alt = "${tags}"/>
    </a>
    <div class="info">
    <p><b>Likes:</b>${likes}</p>
    <p><b>Views:</b>${views}</p>
    <p><b>Comments:</b>${comments}</p>
    <p><b>Downloads:</b>${downloads}</p>
    </div>
    </li>`)
.join('');
photoGallery.insertAdjacentHTML ('beforeend', markup);
lightbox.refresh();
}

export function clearGallery(){
photoGallery.innerHTML='';
}

export function showLoader(){
loader.classList.remove ('is-hidden');
}

export function hideLoader(){
loader.classList.add ('is-hidden');
}
export function showLoadMoreButton() {
loadMoreBtn.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
loadMoreBtn.classList.add('is-hidden)')
}
