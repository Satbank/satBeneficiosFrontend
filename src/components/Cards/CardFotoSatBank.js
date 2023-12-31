import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SatBankFoto from '../../image/satbanckfoto.jpg';
import SatBankFoto1 from '../../image/satbankfoto1.jpg';
import SatBankFoto2 from '../../image/sattbankfoto2.jpg';
import SatBankFoto3 from '../../image/satbankfoto3.jpg';
import Maquininha from '../../image/maquininha.jpg'
import { CardContent, CardMedia } from '@mui/material';

function CardFotoSatBank() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000, 
  };

  return (
    <div style={{ maxWidth: '450px', margin: 'auto' }}>
      <Slider {...settings}>
        <div>
          <CardContent>
            <CardMedia
              component="img"
              height="300"
              image={SatBankFoto}
              alt="foto"
              sx={{
                width: '320px',
              }}
            />
          </CardContent>
        </div>
        <div>
          <CardContent>
            <CardMedia
              component="img"
              height="300"
              image={SatBankFoto1}
              alt="foto"
              sx={{
                width: '320px',
              }}
            />
          </CardContent>
        </div>
        <div>
          <CardContent>
            <CardMedia
              component="img"
              height="300"
              image={SatBankFoto2}
              alt="foto"
              sx={{
                width: '320px',
              }}
            />
          </CardContent>
        </div>
        <div>
          <CardContent>
            <CardMedia
              component="img"
              height="300"
              image={SatBankFoto3}
              alt="foto"
              sx={{
                width: '320px',
              }}
            />
          </CardContent>
        </div>
        <div>
          <CardContent>
            <CardMedia
              component="img"
              height="300"
              image={Maquininha}
              alt="foto"
              sx={{
                width: '320px',
              }}
            />
          </CardContent>
        </div>
      </Slider>
    </div>
  );
}

export default CardFotoSatBank;
