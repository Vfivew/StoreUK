import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fishing1 from '../../img/fishing1.jpg';
import fishing2 from '../../img/fishing2.jpg';

import "./Slider.scss"

const MySlider = () => {
  const settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={fishing1} alt="Slider 1" />
        </div>
        <div>
          <img src={fishing2} alt="Slide 2" />
        </div>
      </Slider>
    </div>
  );
};

export default MySlider;
