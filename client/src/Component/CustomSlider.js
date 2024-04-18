import React, {useEffect, useState ,memo} from 'react'
import { apiGetProducts } from "../Api/product";
import {formatMoney, renderStarFromNumber} from '../Ultils/help'

const CustomSlider = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: '-sold' }),
      apiGetProducts({ sort: '-createdAt' }),
    ]);
    if (response[0]?.success) {
      setProducts(response[0].products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
    <div className='item-center h-[380px]'>
        <div className='mt-4 grid grid-cols-4 gap-4 '>
        {products.map((select) => (
            <div key={select?.id} className='m-1'>
            <div className='m-2'>
                 <div>
                     <div style={{height: '30px'}} className='pb-2 flex w-full items-center justify-start gap-2'>
                         <p className='border-1 m-1 items-center rounded bg-[red]  px-2 py-1 text-[11px] text-[white]'>
                                 {select?.brand}
                         </p>
                         <p className='border-1 m-1 items-center rounded  bg-slate-300  px-2 py-1 text-[11px] text-[red]'>
                                 trả góp 0%
                         </p>
                     </div>
                 </div>
             <div>
             <div className='relative w-full'>
                 <div className='h-[250px] w-full  max-md:h-[auto]'>
                     <img src={select?.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkfJ5oMZl37l-4wuTZz28Om-VQV9e88XjKten66LPwvA&s'} alt=""  className='w-[243px] h-[243px] object-cover'/>
                         </div>
                             <h3 className='w-full px-2 py-2.5 text-left text-base line-clamp-1'>{select?.title}</h3>
                             <div className='flex w-full items-center justify-start px-2'>
                                 <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
                                     <span className=' flex py-2'>{renderStarFromNumber(select?.totalRatings)}</span>
                                     <p className='text-left text-[16px] font-bold text-[red]'>{`${formatMoney(select?.price)} VND`}</p>
                                 </div>
                             </div>
                             <div className='flex w-full items-start justify-start overflow-hidden px-1 py-2'>
                                 <button className=" w-full text-white rounded bg-main" onClick={() => {}}>Mua Ngay</button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        ))}
        </div>
    </div>
    </div>
  )
}

export default memo(CustomSlider)
