import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "../../components/slider/SliderData";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slider, index) => {
        //id we will not manipulate data, we use index otherwise id(manipulated data)
        const { image, heading, desc } = slider; //destructuring data
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
