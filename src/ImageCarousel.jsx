import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [swipeType, setSwipeType] = useState("");

  // carousal handlers
  const nextImageHandler = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImageHandler = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };

  //image loading handler
  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  //swipe handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (diffX > 0) {
      setSwipeType("RIGHT");
    } else if (diffX < 0) {
      setSwipeType("LEFT");
    }
  };

  const handleTouchEnd = (e) => {
    setStartX(null);
    if (swipeType === "RIGHT") {
      prevImageHandler();
    } else if (swipeType === "LEFT") {
      nextImageHandler();
    }
    setSwipeType("");
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        aspectRatio: "1/1",
      }}
    >
      {images?.map((image, index) => {
        return (
          <img
            key={image}
            src={image}
            style={{
              translate: `${-100 * currentImageIndex}%`,
              transition: "translate 700ms ease-in-out",
              flexShrink: 0,
              flexGrow: 0,
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            onLoad={() => handleImageLoad(index)}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {!loadedImages.includes(currentImageIndex) ? (
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              animation: "spin 2s linear infinite",
              borderWidth: "2px",
              borderStyle: "dashed",
            }}
          ></div>
        ) : (
          <></>
        )}
      </div>

      <FontAwesomeIcon
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "transparent",
          fontSize: "1.875rem",
          width: "2rem",
          height: "2rem",
          position: "absolute",
          top: "50%",
          bottom: "50%",
          left: "5px",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={prevImageHandler}
        icon={faCircleChevronLeft}
      />

      <FontAwesomeIcon
        style={{
          color: "white",
          backgroundColor: "transparent",
          fontSize: "1.875rem",
          width: "2rem",
          height: "2rem",
          position: "absolute",
          top: "50%",
          bottom: "50%",
          right: "5px",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={nextImageHandler}
        icon={faCircleChevronRight}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          marginTop: "1rem",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {images.map((_, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "6px",
                  height: "6px",

                  //   opacity: 1,
                  boxShadow: "1px 1px 2px rgba(0,0,0,.9)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                  ...(currentImageIndex === index
                    ? {
                        border: "3px solid white",
                        backgroundColor: "#ffffff",
                      }
                    : {
                        border: "3px solid gray",
                      }),
                }}
                onClick={() => {
                  setCurrentImageIndex(index);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
