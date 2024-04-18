import React,{memo} from 'react'
import { Product } from '.'
import Slider from 'react-slick'

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

const SettingSlider = ({bestSeller, activedTab}) => {
  return (
    <>
      {
        bestSeller && <Slider {...settings}>
        {bestSeller?.map((el) => (
            <Product key={el.id} productData={el} isNew={activedTab === 1 ? false : true} pid={el.pid} />
        ))}
            </Slider> 
      }
    </>
  )
}

export default memo(SettingSlider)
