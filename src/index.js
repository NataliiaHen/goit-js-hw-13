import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getRefs from './js/get-refs'
import renderGallery from './templates/renderGallery'


const refs = getRefs()
const BASE_URL = 'https://pixabay.com/api/?key=25491747-a7ca1db142cb722ad8685be80';

const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1

refs.searchForm.addEventListener('submit', showResult)


function showResult (e){
    e.preventDefault();

    refs.gallery.innerHTML = ''
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    
    renderResponce(searchQuery)
    
refs.loadMoreButton.addEventListener('click', loadMore)

function loadMore (){
    currentPage +=1
    renderResponce(searchQuery)
}
}

function renderResponce(searchValue){
  fetchImages(searchValue)
  .then(responce => {
    Notiflix.Notify.success(`Hooray! We found ${responce.totalHits} images.`)
    createGallery(responce)
  })
  .catch(error => {Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")})
.finally(() => form.reset())

}


const fetchImages = async (searchImage) => {
  try {
    const result = await fetch(`${BASE_URL}&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`);
    const imagesResponce = result.json();

  return imagesResponce;
  } catch (err) {
    throw err;
  }
};


function renderImageCard(image) {
    const markup = renderGallery(image);
    refs.gallery.insertAdjacentHTML('beforeend', markup)
    refs.loadMoreButton.classList.remove('hidden')
  }
  

  function createGallery(data){
    renderImageCard(data)
    lightbox.refresh()
  }





