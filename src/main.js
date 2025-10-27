import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMore = document.querySelector('.button-load');

let page = 1;
let currentQuery = '';

form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(event) {
  event.preventDefault();
  clearGallery();

  const searchText = event.target.elements['search-text'].value.trim();
  if (!searchText) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      maxWidth: '330px',
    });
    return;
  }

  currentQuery = searchText;
   page = 1;
   hideLoadMoreButton();
   loadMore.disabled=true;
  showLoader();

  
     try {
        const data = await getImagesByQuery(searchText, page);
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
          messageColor: '#fff',
          position: 'topRight',
          theme: 'light',
          maxWidth: '330px',
          color: 'white',
         }
        ); return;
      }
      
       createGallery(data.hits);
        const totalPages = Math.ceil(data.totalHits / 15);
      if (page < totalPages ){
        showLoadMoreButton();
        loadMore.disabled = false;
      } else {
      hideLoadMoreButton();
      iziToast.info({
        message: 'You have reached the end of search results.',
        position: 'topRight',
        backgroundColor: '#4092efff',
        messageColor: '#fff',
        maxWidth: '330px',
      });
    }
    }catch(error) {
      console.error('Something went wrong');
      iziToast.error({
        message: 'Something went wrong',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        position: 'topRight',
        maxWidth: '330px',
      });
    }finally {

      hideLoader();
    };
}

loadMore.addEventListener('click', handlerLoadMore);

async function handlerLoadMore() {
  page++;

  loadMore.disabled = true;
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);
      const totalPages = Math.ceil(data.totalHits / 15);
if (page < totalPages){
   showLoadMoreButton();
   loadMore.disabled =false;
}else{
      hideLoadMoreButton();
          iziToast.info({
      message: 'You have reached the end of search results.',
      position: 'topRight',
      backgroundColor: '#4092efff',
      messageColor: '#fff',
      maxWidth: '330px',
    });
    }
    const card = document.querySelector('.photo-card');
    const info = card.getBoundingClientRect();
    window.scrollBy({
      left: 0,
      top: info.height * 2,
      behavior: 'smooth',
    });

  } catch (error) {
        iziToast.error({
        message: 'Something went wrong',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        position: 'topRight',
        maxWidth: '330px',
      });
  } finally {
    hideLoader();
    loadMore.disabled = false;
  }
}
