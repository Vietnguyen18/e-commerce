/* eslint-disable react-hooks/exhaustive-deps */
import React,{memo, useEffect, useState, useCallback} from 'react'
import {createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from '../../Api/product';
import Masonry from 'react-masonry-css'
import BreadCrumb from '../../Component/common/BreadCrumb';
import { InputSelect, Pagination, Product, SearchItem } from '../../Component';
import { sorts } from '../../Ultils/contants';



const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null)
  const [activeClick, setActiveClick] = useState(null)
  const [sort, setSort] = useState('')

  const { category } = useParams()
  const [params] = useSearchParams()
  //
    const fetchProductsByCategory = async(queries) =>{
      const response = await apiGetProducts(queries)
      if(response.success) setProducts(response)
    }
    useEffect(() => {
      // let param = []
      // for(let i of params.entries()) param.push(i)
      // const queries = {}
      let priceQuery ={}
      // for(let i of params) queries[i[0]] = i[1]
      const queries = Object.fromEntries([ ...params])
      if(queries.to && queries.from){
        priceQuery = {
          $and: [
            {price: {gte: queries.from}},
            {price: {lte: queries.to}}
          ]
        }
        delete queries.price
      }
      if(queries.from) queries.price = {gte: queries.from}
      if(queries.to) queries.price = {lte: queries.to}
      delete queries.to
      delete queries.from
      const q = { ...priceQuery, ...queries}
      fetchProductsByCategory(q);
      window.scrollTo(0, 0)
    },[params])
   
    //
    const ChangeActiveFitler = useCallback((name) =>{
      if(activeClick === name) setActiveClick(null)
      else setActiveClick(name)
    },[activeClick])
    //
    const ChangeValue = useCallback((value) =>{
      setSort(value)
    },[sort])

    useEffect(()=>{
      if(sort) {
        navigate({
          pathname: `/${category}`,
          search: createSearchParams({sort}).toString()
        })
      }
    },[sort])
   
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
                        <SearchItem name='Price' activeClick={activeClick} ChangeActive={ChangeActiveFitler} type='input'/>
                        <SearchItem name='Color' activeClick={activeClick} ChangeActive={ChangeActiveFitler} />
                        </div>
                    </div>
                    <div className=' w-1/5 flex flex-col gap-4'>
                        <span className='font-semibold text-sm'>Sort by</span>
                        <div className=' w-full'>
                            <InputSelect value={sort} options={sorts} changeValue={ChangeValue}/>
                        </div>
                    </div>
        </div>
        <div className=' mt-8 w-main m-auto'>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid flex mx-[-10px]"
                columnClassName="my-masonry-grid_column">
                {
                  products?.products?.map(el => (
                    <Product key={el._id} productData={el} isNew={false}  pid={el.pid} normal={true} />
                  ))
                }
            </Masonry>
        </div>
        <div className='w-main m-auto mt-4 flex justify-end'>
           <Pagination totalCount={products?.counts}/>
        </div>
        <div className=' h-[500px]'></div>
    </div>
  )
}

export default memo(Products)
