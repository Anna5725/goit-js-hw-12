import axios from 'axios';

const API_KEY = '50600363-124150c1580125848cace6785';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;
export async function getImagesByQuery(query, page){
const params = {
    key: API_KEY,
    q: query,
    page: page,
    per_page: PER_PAGE,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
};
const response = await axios.get (BASE_URL, {params});
return response.data; 
}
