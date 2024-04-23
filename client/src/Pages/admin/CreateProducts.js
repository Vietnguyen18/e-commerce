/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, {memo, useCallback, useEffect, useState, } from 'react'
import { useForm } from 'react-hook-form'
import InputForm from '../../Component/inputs/InputForm'
import { apiGetCategories } from '../../Api'
import Select from '../../Component/inputs/Select'
import { Button, MarkdownEditor } from '../../Component'
import { getBase64 } from '../../Ultils/help'
import {toast} from 'react-toastify'


const CreateProducts = () => {
  

  

  //api categories
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response.success) setCategories(response.productCategories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  //
  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()
  
  const [payload, setPayload] = useState({
    description: ''
  })
  const [invalidFields, setInvalidFields] = useState([])
  const changeValue = useCallback((e)=>{
    setPayload(e)
  },[payload])

//images
const [preview, setPreview] = useState({
  thumb: null,
  images: []
})
//
const handleCreateProduct = (data) =>{
  if(data.category) data.category = categories?.find(el => el._id === data.category)?.title
  const finalPayload = {...data, ...payload }
  console.log(finalPayload);
  const formData = new FormData()
      for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1])
}
//

const handlePreview =async (file) =>{
  const base64Thumb = await getBase64(file)
  setPreview(prev => ({ ...prev, thumb: base64Thumb }))
}
//

const handlePreviewImages =async (file) =>{
      const imagesPreview =[]
          const base64 = await getBase64(file)
          imagesPreview.push(base64)
     if(imagesPreview.length > 0) setPreview(prev => ({ ...prev,images: imagesPreview}))
}
useEffect(() => {
  handlePreview(watch('thumb')[0])
},[watch('thumb')])
useEffect(() => {
  handlePreviewImages(watch('images'))
},[watch('images')])
console.log(preview);
  

  return (
    <div className=' w-full'>
      <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
          <span>Create New Product</span>
      </h1>
      <div className=' p-4'>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
              <InputForm 
                label='Name Product'
                register={register}
                errors={errors}
                id='title'
                validate={{
                  required: 'Need fill this field'
                }}
                fullWidth
                placeholder='Name of new product'
              />
              <div className=' w-full flex gap-4 mt-8'>
                  <InputForm 
                    label='Price'
                    register={register}
                    errors={errors}
                    id='price'
                    validate={{
                      required: 'Need fill this field'
                    }}
                    style= 'flex-auto'
                    placeholder='Price of new product'
                    type='number'
                  />
                  <InputForm 
                    label='Quantity'
                    register={register}
                    errors={errors}
                    id='quantity'
                    validate={{
                      required: 'Need fill this field'
                    }}
                    style= 'flex-auto'
                    placeholder='Price of new product'
                    type='number'
                  />
                  <InputForm 
                    label='Color'
                    register={register}
                    errors={errors}
                    id='color'
                    validate={{
                      required: 'Need fill this field'
                    }}
                    style= 'flex-auto'
                    placeholder='Color of new product'
                  />
              </div>
              <div className=' w-full my-6 flex gap-4'>
                    <Select 
                      label='Category'
                      options={categories?.map(el => ({code: el._id, value: el.title}))}
                      register={register}
                      id='category'
                      validate={{required: 'Need fill this field'}}
                      style='flex-auto'
                      errors={errors}
                      fullWidth
                    />
                    <Select 
                      label='Brand (Optinal)'
                      options={categories?.find(el => el._id === watch('category'))?.brand?.map(el =>({code: el, value: el}))}
                      register={register}
                      id='brand'
                      validate={{required: 'Need fill this field'}}
                      style='flex-auto'
                      errors={errors}
                      fullWidth
                    />
              </div>
              <MarkdownEditor 
                name = 'description'
                changeValue={changeValue}
                label='Description'
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              {/* img */}
                      <div className=' flex flex-col gap-2 my-8'>
                            <label className=' font-semibold' htmlFor='thumb'>Upload thumb</label>
                            <input 
                            type='file' 
                            id='thumb' 
                              {...register('thumb', {required: 'Need fill'})}
                            />
                            {errors['thumb'] && <small className=' text-xs text-red-500'>{errors['thumb']?.message}</small>}
                      </div>
                      {
                        preview?.thumb && <div className=' my-4'>
                               <img src={preview.thumb} alt='thumbnail' className=' w-[200px] object-contain'/>
                        </div>
                      }
                      <div className=' flex flex-col gap-2 my-8'>
                            <label className=' font-semibold' htmlFor='products'>Upload images of product</label>
                            <input 
                                type='file' 
                                id='products' 
                                multiple
                              {...register('products', {required: 'Need fill'})}
                            />
                            {errors['products'] && <small className=' text-xs text-red-500'>{errors['products']?.message}</small>}
                      </div>
                            {
                              preview?.images.length > 0 && <div className=' my-4 flex w-full gap-3 flex-wrap'>
                                    {
                                      preview.images?.map((el, idx) => (
                                        <img src={el} alt='product_images' key={idx} className=' w-[200px] object-contain'/>
                                      ))
                                    }
                              </div>
                            }
              {/* button */}
              <div className=' flex gap-2'>
              <Button type='submit'>
                  Create new Product
              </Button> 
              <Button type='submit'>
                  Reset
              </Button> 
              </div>
          </form>
      </div>
    </div>
  )
}

export default memo(CreateProducts)
