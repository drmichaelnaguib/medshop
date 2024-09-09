import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import firstSlide from "../../assets/images/header/first-slide.png";
import secondSlide from "../../assets/images/header/second-slide.png";
import thirdSlide from "../../assets/images/header/third-slide.png";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image src={firstSlide} width={500} height={100} alt="First slider" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={secondSlide} width={500} height={100} alt="Second slider" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={thirdSlide} width={500} height={100} alt="Third slider" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
