import React from "react";
import "./imgContainer.css";
const ImgContainer = (props) => {
  console.log("props", props);
  return (
    <div className="main-container">
      <div className="image-container">
        {props.image.map((data, id) => {
          return (
            <div key={id}>
              <img src={data.webformatURL} alt={data.tags} />
              {/* <img src={data.webformatURL} alt={data.tags} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImgContainer;
