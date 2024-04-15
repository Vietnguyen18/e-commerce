import React,{memo} from "react";
import Slider from "react-slick";



const listBanners = [
  {
    id: 1,
    img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/15/1/1713155993824_824x400.jpg'
  },
  {
    id: 2,
    img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/15/1/1713115140733_redmi_a3_824x400.jpg'
  },
  {
    id: 3,
    img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/15/1/1713139366295_ip15_pro_max_824x400_1.jpg'
  },
  {
    id: 4,
    img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/11/1/1712831903462_aaap_laang_uag_824x400.jpg'
  },
  {
    id: 5,
    img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/15/1/1713169095889_iphone_cuaa_nhuaa_moaaaai_824x400.jpeg'
  },
]

function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
            {listBanners?.map((el) => (
                <div key={el.id}>
                  <img src={el.img} alt="Banner" />
                </div>
            ))}
    </Slider>
  );
}

export default memo(Banner);
