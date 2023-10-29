import axios from "axios";

// Create an instance of the Axios HTTP client with specific configuration.
const API = axios.create({
  baseURL: "https://pixabay.com/api/",
  headers: {
    // Define request headers 
    Accept: "application/json", // Specify that we accept JSON responses.
    "Content-Type": "application/json", // Specify that we're sending JSON data in requests.
  },
  params: {
    // Define default parameters that will be sent with every request.
    key: "40343383-4489e18d267dd59be7f34c713", // API key for authentication.
    image_type: "all", 
    orientation: "vertical", 
    safeSearch: true, 
    // category: "food",    //Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music
   
  },
});

export default API;
