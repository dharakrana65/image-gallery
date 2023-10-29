import React, { useState, useEffect } from "react";
import API from "./ApiUrl.jsx";
import ImgContainer from "./pages/ImgContainer.jsx";
import "./index.css";
import debounce from "lodash.debounce";

const App = () => {
  const [images, setImages] = useState([]); // storing images
  const [totalPages, setTotalPages] = useState(true); // total pages of images
  const [searchQuery, setSearchQuery] = useState(""); // the search query
  const [loading, setLoading] = useState(false);
  let pageNum = 1; 

  // Debounced function to fetch images with a delay after user input
  const debouncedFetchImages = debounce((pageNumber, query) => {
    setLoading(true); // Set loading state to true
    API.get("/", { params: { page: pageNumber, q: query } })
      .then((response) => {
        setLoading(false); // Set loading state to false
        const imagesForCurrentPage = response.data.hits; // Images for the current page
        setImages((prevImages) => [...prevImages, imagesForCurrentPage]);
        setTotalPages(response.data.totalHits / response.data.hits.length);
      })
      .catch((err) => {
        setLoading(false); // Set loading state to false on error
        console.error(err);
      });
  }, 200);

  useEffect(() => {
    // fetch images when the component mounts
    debouncedFetchImages(pageNum, searchQuery);
  }, []);

  //fetch images when the component or search query updates
  useEffect(() => {
    setImages([]);
    setTotalPages(true);
    debouncedFetchImages(pageNum, searchQuery); // Fetch images
  }, [searchQuery]);

  return (
    <>
      <div className="search-bar">
        <div className="heading-container">
          <span>Immerse in Imagery</span>
          <span>Where Every Picture Tells a Tale</span>
        </div>
        <input
          type="text"
          placeholder="Search images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="main-wrapper">
        {Array.isArray(images) && images.length > 0 ? (
          images.map((data, index) => (
            <ImgContainer image={data} key={index}></ImgContainer>
          ))
        ) : loading ? (
          <p>Loading images...</p>
        ) : (
          <p>No images to display.</p>
        )}
      </div>

      {totalPages > 1 && (
        <button
          className="load-btn"
          onClick={() => debouncedFetchImages(pageNum + 1, searchQuery)}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default App;
