import React,{useState, memo} from 'react'
import label from '../Assets/label1.png'
import labelBlue from '../Assets/label2.png'
import {renderStarFromNumber, formatMoney} from "../Ultils/help"
import {SelectOption} from './'
import icons from '../Ultils/icon'
import { Link } from 'react-router-dom'

    const { FaEye, AiOutlineMenu, AiFillHeart} = icons

const Product = ({productData, isNew, normal}) => {
    const [isShow, setIsShow] = useState(false)
  return (
    <div className='w-full'>
        <Link className=' m-3 text-base border p-[15px] flex flex-col items-center h-[380px] ' to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}>
            <div className='w-full relative' 
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShow(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShow(false)
                }}
            
            >
                {isShow && <div className=' left-0 right-0 absolute bottom-0 flex justify-center gap-3 animate-slide-top'>
                    <SelectOption icon={<FaEye/>}/>
                    <SelectOption icon={<AiOutlineMenu/>}/>
                    <SelectOption icon={<AiFillHeart/>}/>
                </div>}
                <img src={productData?.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkfJ5oMZl37l-4wuTZz28Om-VQV9e88XjKten66LPwvA&s'} alt='' className='w-[243px] h-[243px] object-cover'/>
                {!normal && <img src={isNew ? label : labelBlue} alt='' className=' absolute top-[-16px] right-0 w-[50px] object-cover' />}
                <label className='font-bold top-[-3px] absolute text-white right-[9px]'>{isNew ? 'New' : 'Best'}</label>
            </div>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full '>
                    <span className=' line-clamp-1'>{productData?.title}</span>
                    <span className=' flex py-2'>{renderStarFromNumber(productData?.totalRatings)}</span>
                    <span className=' py-2'>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
        </Link>
    </div>
  )
}

export default memo(Product)
