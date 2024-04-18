/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../Api/product'
import BreadCrumb from '../../Component/BreadCrumb'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, fotmatPrice, renderStarFromNumber } from '../../Ultils/help'
import SelectQuantity from '../../Component/SelectQuantity'
import { ExtraInfor, ProductInformation, SettingSlider } from '../../Component'
import {extraInfor} from '../../Ultils/contants'

const DetailProducts = () => {
  const {pid, title, category } = useParams()
  console.log(pid, title);
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  const [quantity, setQuantity] = useState(1)
  console.log(relatedProducts);

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    if(response.success) setProduct(response.productData)
    console.log(response);
  }
  const fetchProducts = async () => {
    const response = await apiGetProducts({category})
    if(response.success) setRelatedProducts(response.products)
    console.log(response);
  }
  useEffect(() => {
    if(pid) {
      fetchProducts()
      fetchProductData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pid])
  // select image
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const handleAddToCart = () => {
    console.log('Adding product to cart:', product);
  };


  //
    const handleQuantity = useCallback((number)=>{
      console.log(number);
      if(!Number(number) || Number(number) < 1 ) {
        return
      }else setQuantity(number)

    },[quantity])
  //
  const handleChangeQuantity = useCallback((flag)=> {
    if(flag === 'minus' && quantity === 1) return
      if(flag === 'minus') setQuantity(prev => +prev - 1)
      if(flag === 'plus') setQuantity(prev => +prev + 1)
  },[quantity])

  return (
    <div className=' w-full'>
        <div className='  h-[80px] justify-center items-center bg-slate-100 flex'>
              <div className='w-main'>
                  <h3>{title}</h3>
                  <BreadCrumb title={title} category={category}/>
              </div>
        </div>
        <div className=' w-main m-auto mt-4 flex '>
              <div className=' flex flex-col gap-4 w-2/5'>
                <div className='h-[458px] w-[458px] border object-cover'>
                    <ReactImageMagnify {...{
                        smallImage: {
                        alt: '',
                        isFluidWidth: true,
                        src: product?.thumb
                        },
                        largeImage: {
                            src: product?.thumb,
                            width: 1100,
                            height: 700
                        }
                        }} />
                </div>
                  <div className=' w-[458px]'>
                        <Slider {...settings} className=' Detail-slider'>
                            {product?.images?.map(el => (
                                <div key={el} className=' flex gap-2 w-full'>
                                  <img src={el} alt='Sub Product' className=' w-[143px] h-[143px] border object-cover'/>
                                </div>
                            ))}
                        </Slider>
                  </div>
              </div>
              <div className=' w-2/5'>
                  <div className=' px-2'>
                      <div className=' flex items-center justify-between'>
                        <h2 className=' text-[30px] font-semibold mt-2'>{`${formatMoney(fotmatPrice(product?.price))} VND`}</h2>
                        <span className=' text-sm text-main'>{`Kho: ${product?.quantity}`}</span>
                      </div>
                    <div className=' flex items-center gap-1'>
                          {renderStarFromNumber(product?.totalRatings)?.map(el => (<span key={el}>{el}</span>))}
                          <span className=' text-sm text-[#994b36] italic'>{`(Đã bán: ${product?.sold} cái)`}</span>
                    </div>
                    <ul className='text-sm to-gray-500 pt-2 list-square pl-5'>
                        {product?.description?.map(el => (<li key={el} className=' leading-6 '>{el}</li>))}
                    </ul>
                    <div className=' flex flex-col gap-8 mt-3'>
                      <div className=' flex items-center gap-4'>
                        <span className=' font-semibold' >Quantity</span>
                        <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity}/>
                      </div>
                      <button type='button' className=' px-4 py-2 rounded-md text-white bg-main text-semiboid my-2 w-full' onClick={()=> handleAddToCart()}>
                              Add to cart
                      </button>
                    </div>
                  </div>
              </div>
              <div className=' w-1/5 '>
                {extraInfor?.map(el => (
                  <ExtraInfor key={el.id} icon={el.icon} title={el.title} sub={el.sub}/>
                ))}
              </div>
        </div>
            <div className=' w-main mt-8 m-auto'>
                <ProductInformation />
            </div>
            <div className='w-main m-auto mt-8'>
              <h3 className=' text-[20px font-semibold py-[15px] border-b-4 border-main uppercase' > orther customer also liked </h3>
              <SettingSlider bestSeller={relatedProducts}/>
            </div>
        <div className=' h-[500px]'></div>
    </div>
  )
}

export default DetailProducts
