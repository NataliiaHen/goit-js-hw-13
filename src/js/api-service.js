const BASE_URL = 'https://pixabay.com/api/?key=25491747-a7ca1db142cb722ad8685be80';
  
function fetchImage(searchImage) {
    
  return fetch(`${BASE_URL}&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => {
    return response.json();
  });
};

export default {fetchImage};