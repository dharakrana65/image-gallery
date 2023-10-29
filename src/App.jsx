import React from "react";
import { useState, useEffect } from "react";
import API from "./ApiUrl.jsx";
import ImgContainer from "./pages/ImgContainer.jsx";
import "./index.css";
const App = () => {
  let pageNum = 1;
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchImages = (pageNumber) => {
    API.get("/", { params: { page: pageNumber, q: searchQuery } })
      .then((response) => {
          console.log(response.data);
          setImages([...images, response.data.hits]);
          setTotalPages(response.data.totalHits / response.data.hits.length);
          console.log("image array :", images);
          console.log(totalPages);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setImages([]);
    fetchImages(pageNum);
  }, [searchQuery]);
  return (
    <>
      <div className="main-wrapper">
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
        {images.map((data, index) => (
          <ImgContainer image={data} key={index}></ImgContainer>
        ))}
      </div>

      {totalPages > 1 && (
        <button className="load-btn" onClick={() => fetchImages(pageNum + 1)}>
          Load More
        </button>
      )}
    </>
  );
};

export default App;
