import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Image } from '@chakra-ui/react';
import './Main.css';

const ImageCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <Image src='./images/phone-cam.jpg' alt='Phone Cam Concert' />
        </div>
        <div className="embla__slide">
          <Image src='./images/stones-band.png' alt='Rolling Stones Cover Band' />
        </div>
        <div className="embla__slide">
          <Image src='./images/mariachi.png' alt='Mariachis' />
        </div>
        <div className="embla__slide">
          <Image src='./images/drums.jpg' alt='Playing drums' />
        </div>
        <div className="embla__slide">
          <Image src='./images/band-shell.jpg' alt='Band playing' />
        </div>
        <div className="embla__slide">
          <Image src='./images/band-play2.jpg' alt='Band playing' />
        </div>
        <div className="embla__slide">
          <Image src='./images/night-show.jpg' alt='Night show' />
        </div>
        <div className="embla__slide">
          <Image src='./images/people.jpg' alt='People dancing' />
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel;
