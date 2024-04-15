import React,{useEffect ,useState} from 'react'
import { apiGetProducts } from '../Api/product'
import ProductCard from './ProductCard'
import Slider from 'react-slick'

const Slides = [
    {
      id: 1,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/15/1/1713156780618_caaa_saaac_anker_30w_615x104.jpg'
    },
    {
      id: 2,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/2/26/1/1711429570229_garmin_forerunner_series_02_615x104.jpg'
    },
    {
      id: 3,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/2/7/1/1709809313469_flast_sale_loa_615x104.jpg'
    },
    {
      id: 4,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/1/21/1/1708483020579_pk_caa_nhaa_maaai_615x104.jpg'
    },
    {
      id: 5,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/1/29/1/1709218745852_caang_mua_caang_raaa_2_615x104.jpg'
    },
  ]

const FeatuteProducts = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async ()=>{
        const response = await apiGetProducts({limit: 9, totalRatings: 3})
        if(response.success) setProducts(response.products)
        console.log(response);
    }

    useEffect(() =>{
        fetchProducts()
    },[])

    // select image
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className=' w-fulll '>
        <h3 className=' text-[20px font-semibold py-[15px] border-b-4 border-main uppercase' > Featute Products </h3>
        <div className='flex flex-wrap mt-4 mx-[10px]'>
            {
                products?.map(el => (
                    < ProductCard 
                        key={el.id}
                        image ={el.thumb}
                        title={el.title}
                        totalRatings={el.totalRatings}
                        price = {el.price}
                    />
                ))
            }
        </div>
        <Slider {...settings}>
            {Slides?.map((el) => (
                <div key={el.id}>
                  <img src={el.img} alt="Banner" className='w-full h-[120px]'/>
                </div>
            ))}
    </Slider>
    </div>
  )
}

export default FeatuteProducts
