import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".button-load");

export function createGallery(images) {

if(!images){
    console.error('Expected array, got:', images);
    return;
  }

  
  const markup = images
  .map(img =>
    `
    <li class="photo-card"> 
    <a href="${img.largeImageURL}">
    <img class="imgs" src="${img.webformatURL}" alt="${img.tags}" />
    </a>
          <div class="info">
          <p class="likes"> <b>Likes</b> ${img.likes}</p>
           <p class="views"> <b>Views</b>${img.views}</p>
            <p class="comments"> <b>Comments</b>${img.comments}</p>
             <p class="downloads"> <b>Downloads</b>${img.downloads}</p>
          </div>
    </li>`)
    .join("");
  galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();


}

export function clearGallery(arr) {
    galleryContainer.innerHTML="";
}

export  function showLoader() {
loader.classList.remove("hidden");
}

export  function hideLoader() {
loader.classList.add("hidden");
}

 export function showLoadMoreButton(){
loadMore.classList.replace("load-more-hidden", "load-more");
 }

 export function hideLoadMoreButton(){
loadMore.classList.replace("load-more", "load-more-hidden");
 }






