
const API_KEY = "52825058-9c2b701d3fa996d89232a6d0f";
const BASE_URL = "https://pixabay.com/api/";
import axios from 'axios';



export async function getImagesByQuery(query, page=1) {
try { 
      const response = await axios (BASE_URL, {
params :{
      key: API_KEY,
        q: query,
        image_type: "photo",
  orientation : "horizontal",
  safesearch: true,
  per_page : 15,
  page
},});
return response.data;
}
catch(error){
      console.log(error.message);
      throw error;
}
}


