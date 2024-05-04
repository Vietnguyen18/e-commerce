/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { InputForm, Pagination } from '../../Component'
import { useForm } from 'react-hook-form'
import { apiGetProducts } from '../../Api'
import moment from 'moment'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useDebounce from '../../Component/hooks/useDebounce'
import UpdateProducts from './UpdateProducts'

const ManagerProducts = () => {

  const {register, formState: {errors}, watch} = useForm()
  const [isProducts, setIsProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [isEdit, setIsEdit] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)

  const queryDebounce = useDebounce(watch('q'), 800)

  const fetchProducts = async(params) => {
    const response = await apiGetProducts({ ...params, limit: +process.env.REACT_APP_LIMIT})
    if(response.success){
       setIsProducts(response.products)
       setCounts(response.counts)
    }
  }

  const render = useCallback(()=>{
    setIsUpdate(!isUpdate)
  })

  useEffect(()=>{
    if(queryDebounce){
      navigate({
        pathname: location.pathname,
        search: createSearchParams({q: queryDebounce}).toString(),
      })
    }else {
      navigate({
        pathname: location.pathname,
      })
    }
  },[queryDebounce])

  useEffect(() => {
    const searchParams = Object.fromEntries([ ...params])
    fetchProducts(searchParams)
  },[params, isUpdate])

  // Edit


  return (
    <div className=' w-full flex flex-col gap-4 relative'>
      {/* Edit */}
      {isEdit && <div className=' absolute inset-0 bg-gray-100 min-h-screen z-50'>
        <UpdateProducts editProducts={isEdit} render={render}  setEditProducts = {setIsEdit}/>
      </div>
      }
      <div className=' h-[69px] w-full'></div>
      <div className='w-full bg-gray-100  flex justify-between items-center p-4 border-b fixed top-0'>
        <h1 className=' text-3xl font-bold tracking-tight'>
            <span>Manager Products</span>
        </h1>
      </div>
      <div className=' flex justify-end items-center px-4'>
          <form className=' w-[45%]'>
              <InputForm 
                  id='q'
                  register={register}
                  errors={errors}
                  fullWidth
                  placeholder='Search products, title, description,....'

              />
          </form>
      </div>
      <table className=' table-auto '>
          <thead className=' font-bold bg-gray-600 text-sm  text-white'>
              <tr className=' border border-gray-500'>
              <th className=' px-4 py-2'>STT</th>
                  <th className=' px-4 py-2'>Thumb</th>
                  <th className=' px-4 py-2'>Title</th>
                  <th className=' px-4 py-2'>Brand</th>
                  <th className=' px-4 py-2'>Category</th>
                  <th className=' px-4 py-2'>Price</th>
                  <th className=' px-4 py-2'>Quantity</th>
                  <th className=' px-4 py-2'>Sold</th>
                  <th className=' px-4 py-2'>Ratings</th>
                  <th className=' px-4 py-2'>UpdateAt</th>
                  <th className=' px-4 py-2'>Actions</th>
              </tr>
          </thead>
          <tbody>
                {
                  isProducts?.map((el,idx) =>(
                    <tr key={el._id}>
                        <td className=' py-2 text-center '>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + idx + 1}</td>
                        <td className=' py-2 text-center '>
                          <img src={el.thumb} alt='thumb' className=' w-12 h-12 object-cover '/>
                        </td>
                        <td className=' py-2 text-center '>{el.title}</td>
                        <td className=' py-2 text-center '>{el.brand}</td>
                        <td className=' py-2 text-center '>{el.category}</td>
                        <td className=' py-2 text-center '>{el.price}</td>
                        <td className=' py-2 text-center '>{el.quantity}</td>
                        <td className=' py-2 text-center '>{el.sold}</td>
                        <td className=' py-2 text-center '>{el.totalRatings}</td>
                        <td className=' py-2 text-center '>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                        <td className=' py-2 text-center '>
                             <span className=' px-2 text-orange-600 hover:underline cursor-pointer' onClick={()=> setIsEdit(el)} >Edit</span>
                             <span className=' px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                         </td>
                    </tr>
                  ))
                }
          </tbody>
      </table>
      <div className='w-full flex justify-end'>
        <Pagination totalCount={counts} />
      </div>
      <div className=' h-[300px]'></div>
    </div>
  )
}

export default ManagerProducts
