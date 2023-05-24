const BASE_URL = 'https://pixabay.com/api';

const API_KEY = '36348487-c65aabf2142b2d12b58415f08';

async function fetchImages(value, page) {
  return await fetch(
    `${BASE_URL}/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(
        new Error('Oops...something going wrong. Try again later.')
      );
    }
    return response.json();
  });
}

export default fetchImages;
