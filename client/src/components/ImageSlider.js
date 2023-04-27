import './imageSliderStyles.css';
import {React, useState} from 'react';

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      currentImage === 0 ? images.length - 1 : currentImage - 1
    );
  };

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="slider-container">
      <div className="slider">
        {images.length > 0 && (
          <img
            src={images[currentImage]}
            alt={`Image ${currentImage + 1}`}
          />
        )}
        <button className="prev" onClick={prevImage}>
          Prev
        </button>
        <button className="next" onClick={nextImage}>
          Next
        </button>
      </div>
    </div>
  );
};
export default ImageSlider;