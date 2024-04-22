import React,{memo, useEffect, useState, useCallback} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from '../../Api/product';
import Masonry from 'react-masonry-css'
import BreadCrumb from '../../Component/common/BreadCrumb';
import { Product, SearchItem } from '../../Component';



const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {

  const [products, setProducts] = useState(null)
  const [activeClick, setActiveClick] = useState(null)

  const { category } = useParams()
    console.log(category);
  const [params] = useSearchParams()
  //
    const fetchProductsByCategory = async(queries) =>{
      const response = await apiGetProducts(queries)
      if(response.success) setProducts(response.products)
      console.log(response);
    }
    useEffect(() => {
      let params = []
      for(let i of params.entries()) params.push(i)
      const queries = {}
      for(let i of params) queries[i[0]] = i[1]
      fetchProductsByCategory(queries);
    },[params])
   
    //
    const ChangeActive = useCallback((name)=>{
      if(activeClick === name) setActiveClick(null)
      else setActiveClick(name)
    },[activeClick])
  return (
    <div className=' w-full'>
      <div className='  h-[80px] justify-center items-center bg-slate-100 flex'>
              <div className='w-main ml-2'>
                  <h3 className=' font-semibold uppercase'>{category}</h3>
                  <BreadCrumb category={category}/>
              </div>
        </div>
        <div className=' w-main border p-4 flex justify-between mt-8 m-auto'>
                    <div className=' w-4/5 flex-auto flex flex-col gap-4'>
                        <span className=' font-semibold text-sm'>Filter By</span>
                        <div className=' flex items-center gap-4'>
                        <SearchItem name='Price' activeClick={activeClick} ChangeActive={ChangeActive} type='input'/>
                        <SearchItem name='Color' activeClick={activeClick} ChangeActive={ChangeActive} />
                        </div>
                    </div>
                    <div className=' w-1/5 flex'>
                        <span className='font-semibold text-sm'>Sort by</span>
                    </div>
        </div>
        <div className=' mt-8 w-main m-auto'>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid flex mx-[-10px]"
                columnClassName="my-masonry-grid_column">
                {
                  products?.map(el => (
                    <Product key={el._id} productData={el} isNew={false}  pid={el.pid} normal={true} />
                  ))
                }
            </Masonry>
        </div>
        <div className=' h-[500px]'></div>
    </div>
  )
}

export default memo(Products)
