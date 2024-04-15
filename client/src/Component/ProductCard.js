import React from 'react'
import { formatMoney, renderStarFromNumber } from '../Ultils/help'

const ProductCard = ({image, price, totalRatings, title}) => {
  return (
    <div className=' w-1/3 flex-auto  flex px-[10px] mb-[20px]'>
        <div className='flex w-full border'>
            <img src={image} alt='Products'  className='w-[120px] object-contain p-4'/>
            <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
                    <span className=' line-clamp-1'>{title}</span>
                    <span className=' flex py-2'>{renderStarFromNumber(totalRatings)}</span>
                    <span className=' py-2'>{`${formatMoney(price)} VND`}</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
