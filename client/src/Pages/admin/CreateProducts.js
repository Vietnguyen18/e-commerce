/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, {memo, useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import InputForm from '../../Component/inputs/InputForm'
import {apiGetCategories, apiCreateProduct} from '../../Api'
import Select from '../../Component/inputs/Select'
import {Button, MarkdownEditor} from '../../Component'
import {getBase64} from '../../Ultils/help'
import {toast} from 'react-toastify'
import {RiDeleteBin2Fill} from "react-icons/ri"
import {RingLoader} from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import path from '../../Ultils/path'

const CreateProducts = () => {

  //api categories
  const [categories, setCategories] = useState(null)
  const fetchCategories = async () => {
    const response = await apiGetCategories()
    if (response.success) setCategories(response.productCategories)
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  //
  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()

  // lưu giá trị của description
  const [payload, setPayload] = useState({
    description: ''
  })
  const [invalidFields, setInvalidFields] = useState([])
  const changeValue = useCallback((e) => {
    setPayload(e)
  }, [payload])

  const [iHoverDelete, setIHoverDelete] = useState(null)

  //images
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })
  console.log(preview)

  const handlePreview = async (file) => {
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({...prev, thumb: base64Thumb}))
  }

  const handlePreviewImages = async (files) => {
    const imagesPreview = []
    for (let file of files) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        toast.warning('File not supported!')
        return
      }
      const base64 = await getBase64(file)
      imagesPreview.push({name: file.name, path: base64})
    }
    setPreview(prev => ({...prev, images: imagesPreview}))
  }
//
  useEffect(() => {
    if (watch('thumb')) {
        handlePreview(watch('thumb')[0])
    }
}, [watch('thumb')])

useEffect(() => {
    if (watch('images')) {
        handlePreviewImages(watch('images'))
    }
}, [watch('images')])

  // delete images
  const handelRemoveImages = (name) => {
    const files = [...watch('images')]
    if (preview.images?.some(el => el.name === name)) setPreview(prev => ({...prev, images: prev.images?.filter(el => el.name !== name)}))
    reset({
      images: files?.filter(el => el.name !== name)
    })
  }

  // handle loading
  const [isLoading, setIsLoading] = useState(false) 
  //chuyen trang
    const navigate = useNavigate()

  const handleCreateProduct = async (data) => {
    setIsLoading(true)
    if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
    const finalPayload = {...data, ...payload}
    console.log(finalPayload)
    const formData = new FormData()
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
    if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
    if (finalPayload.products) {
      for (let image of finalPayload.products) formData.append('images', image)
    }
    const response = await apiCreateProduct(formData)
    setIsLoading(false)
    if (response.success) {
      toast.success(response.mes)
      reset()
      setPayload({
        thumb: '',
        images: []
      })
      navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCTS}`)
    } else toast.error(response.mes)
  }

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New Product</span>
      </h1>
      <div className='p-4'>
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
          <div className='w-full flex gap-4 mt-8'>
            <InputForm 
              label='Price'
              register={register}
              errors={errors}
              id='price'
              validate={{
                required: 'Need fill this field'
              }}
              style='flex-auto'
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
              style='flex-auto'
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
              style='flex-auto'
              placeholder='Color of new product'
            />
          </div>
          <div className='w-full my-6 flex gap-4'>
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
              label='Brand (Optional)'
              options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({code: el, value: el}))}
              register={register}
              id='brand'
              validate={{required: 'Need fill this field'}}
              style='flex-auto'
              errors={errors}
              fullWidth
            />
          </div>
          <MarkdownEditor 
            name='description'
            changeValue={changeValue}
            label='Description'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {/* img */}
          <div className='flex flex-col gap-2 my-8'>
            <label className='font-semibold' htmlFor='thumb'>Upload thumb</label>
            <input 
              type='file' 
              id='thumb' 
              {...register('thumb', {required: 'Need fill'})}
            />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>
          {preview?.thumb && (
            <div className='my-4'>
              <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain'/>
            </div>
          )}
          <div className='flex flex-col gap-2 my-8'>
            <label className='font-semibold' htmlFor='images'>Upload images of product</label>
            <input 
              type='file' 
              id='images' 
              multiple
              {...register('images', {required: 'Need fill'})}
            />
            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          </div>
          {preview.images.length > 0 && (
            <div className='my-4 flex w-full gap-3 flex-wrap'>
              {preview.images?.map((el, idx) => (
                <div key={idx} className='w-fit relative' onMouseEnter={() => setIHoverDelete(el.name)} onMouseLeave={() => setIHoverDelete(null)}>
                  <img src={el.path} alt='No images Available' className='w-[200px] object-contain' />
                  {iHoverDelete === el.name && (
                    <div 
                      className='absolute cursor-pointer inset-0 bg-overlay flex items-center justify-center'
                      onClick={() => handelRemoveImages(el.name)}
                    >
                      <RiDeleteBin2Fill size={24} color='white'/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* button */}
          <div className='flex gap-2'>
            <Button type='submit' disabled={isLoading}>
              Create new Product
            </Button> 
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <RingLoader color='#F37A24' size={60} loading={isLoading} />
        </div>
      )}
    </div>
  )
}

export default memo(CreateProducts)
