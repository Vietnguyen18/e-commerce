    /* eslint-disable no-use-before-define */
    /* eslint-disable react-hooks/exhaustive-deps */
    /* eslint-disable react/style-prop-object */
    import React,{memo, useCallback, useEffect, useState} from 'react'
    import { Button, InputForm, MarkdownEditor, Select } from '../../Component';
    import { useForm } from 'react-hook-form'
    import { toast } from 'react-toastify';
    import { apiGetCategories, apiUpdateProduct } from '../../Api';
    import { getBase64 } from '../../Ultils/help';
    import Swal from 'sweetalert2';


    const UpdateProducts = ({editProducts, render, setEditProducts}) => {
        console.log(editProducts);
        const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()
    //api categories
    const [categories, setCategories] = useState(null);
    const fetchCategories = async () => {
        const response = await apiGetCategories();
        if (response.success) setCategories(response.productCategories);
    };
    //
    useEffect(() => {
        fetchCategories();
    }, []);
    //
    useEffect(() => {
        reset({
            title: editProducts?.title || '',
            price: editProducts?.price || '',
            quantity: editProducts?.quantity || '',
            color: editProducts?.color || '',
            category: editProducts?.category || '',
            brand: editProducts?.brand?.toLowerCase() || '',
        })
        setPayload({description: typeof editProducts?.description === 'object' ? editProducts?.description?.join(', ') : editProducts?.description})
    },[editProducts])
    console.log(editProducts);
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

    const handlePreview =async (file) =>{
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    setPreview({
        thumb: editProducts?.thumb || "",
        images: editProducts?.images || []
    })
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('File not supported!');
                return;
            }
            const base64 = await getBase64(file);
            imagesPreview.push(base64);
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }));
    };
    useEffect(() => {
        if(watch('thumb')){
            handlePreview(watch('thumb')[0])
        }
    },[watch('thumb')])
    useEffect(() => {  
        if(watch('images')) {
            handlePreviewImages(watch('images'));
        }
    }, [watch('images'), handlePreviewImages]);

    // cancel
    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you ready to cancel editing?',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setEditProducts(null);
            }
        });
    };

    // submit handle
    const handleUpdateProduct = async (data) =>{
        if (data.category) data.category = categories?.find(el => el.title === data.category)?.title;
        const finalPayload = { ...data, ...payload, ...preview };
        console.log(finalPayload);
        
        const formData = new FormData();
        for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
        if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0]);
        if (finalPayload.products) {
            for (let image of finalPayload.products) formData.append('images', image);
        }
        
        const response = await apiUpdateProduct(formData);
        if (response.success) {
            toast.success(response.mes);
            reset();
            setPayload({
                thumb: '',
                images: []
            });
        } else {
            toast.error(response.mes);
        }
    }

    return (
        <div className=' w-full flex flex-col gap-4 relative'>
            <div className=' h-[69px] w-full'></div>
            <div className=' left-[327px] bg-gray-100  flex justify-between items-center right-0 p-4 border-b fixed top-0'>
            <h1 className=' text-3xl font-bold tracking-tight'>
                <span>Update Products</span>
            </h1>
            <span className=' text-main hover:underline cursor-pointer' onClick={()=> handleCancel()}>Cancel</span>
        </div>
        <div className=' p-4'>
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                        options={categories?.map(el => ({code: el.title, value: el.title}))}
                        register={register}
                        id='category'
                        validate={{required: 'Need fill this field'}}
                        style='flex-auto'
                        errors={errors}
                        fullWidth
                        />
                        <Select 
                        label='Brand (Optinal)'
                        options={categories?.find(el => el.title === watch('category'))?.brand?.map(el =>({code: el.toLowerCase(), value: el})) || []}
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
                    value={payload.description}
                />
                {/* img */}
                        <div className=' flex flex-col gap-2 my-8'>
                                <label className=' font-semibold' htmlFor='thumb'>Upload thumb</label>
                                <input 
                                type='file' 
                                id='thumb' 
                                {...register('thumb')}
                                />
                                {errors['thumb'] && <small className=' text-xs text-red-500'>{errors['thumb']?.message}</small>}
                        </div>
                        
                        <div className=' flex flex-col gap-2 my-8'>
                                <label className=' font-semibold' htmlFor='products'>Upload images of product</label>
                                <input 
                                    type='file' 
                                    id='products' 
                                    multiple
                                {...register('products')}
                                />
                                {errors['products'] && <small className=' text-xs text-red-500'>{errors['products']?.message}</small>}
                        </div>
                       
                {/* button */}
                <div className=' flex gap-2'>
                <Button type='submit'>
                    Update Product
                </Button> 
                </div>
            </form>
        </div>
        </div>
    )
    }

    export default memo(UpdateProducts)
