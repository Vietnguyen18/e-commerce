/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{memo, useCallback, useEffect,useState} from 'react'
import { apiDeleteUser, apiGetUser, apiUpdateUser } from '../../Api'
import { roles } from '../../Ultils/contants'
import moment from 'moment'
import { Button, InputField, InputForm, Pagination, Select } from '../../Component'
import useDebounce from '../../Component/hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const ManageUser = () => {
  const [users, setUser] = useState(null)
  const [queries, setQueries] = useState({
    q: ''
  })
  const [params] = useSearchParams()
  const {register, formState: {errors}, handleSubmit} = useForm({
    email: '',
    firstname:'',
    lastname:'',
    role: '',
    mobile: '',
  })
  const [isEdit, setIsEdit] = useState(null)
  console.log(isEdit);
  const [isUpdate, setIsUpdate] = useState(false)
  //
  const fetchUsers = async(params) =>{
    const response = await apiGetUser({ ...params, limit: process.env.REACT_APP_PRODUCT_LIMIT})
    if(response.success) setUser(response)
  }
/// update 
    const render = useCallback(()=>{
      setIsUpdate(!isUpdate)
    },[isUpdate])

// lây gia tri tron go search
  const queriesDebounce = useDebounce(queries.q,800)
    useEffect(() => {
      const queries = Object.fromEntries([ ...params])
      if(queriesDebounce) {
        queries.q = queriesDebounce
      }
      fetchUsers(queries)
    },[queriesDebounce,queries,isUpdate])

    //Edit
    const handleUpdate = async (data) =>{
       const response = await apiUpdateUser(data, isEdit._id)
       if(response.success) {
        setIsEdit(null)
        render()
        toast.success(response.mes)
       }else toast.error(response.mes)
  
    }
    //delete
    const handleDelete = async(uid) =>{
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you ready remove this user',
        showCancelButton: true,
      }).then(async(result)=>{
        if(result.isConfirmed) {
          const response = await apiDeleteUser(uid)
          if(response.success) {
            render()
            toast.success(response.mes)
          }else toast.error(response.mes)
        }
      })
    }
    // back
    const handleBack = () => {
      Swal.fire({
          title: 'Are you sure?',
          text: 'Are you ready to cancel editing?',
          showCancelButton: true,
      }).then((result) => {
          if (result.isConfirmed) {
              setIsEdit(null);
          }
      });
  };

  return (
    <div className=' w-full'>
      <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
            <span> Manage User</span>
      </h1>
      <div className=' w-full p-4'>
        <div className=' flex justify-end py-4'>
            <InputField 
              nameKey={'q'}
              value={queries.q}
              setValue={setQueries}
              style='w-[502px]'
              placeholder='Search name, email, role user....'
              isHideLabel
            />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {isEdit && <Button type='submit'>Update</Button>}
         <table className=' table-auto mb-6 mt-3 text-center w-full'>
            <thead className=' font-bold bg-gray-600 text-sm  text-white'>
              <tr className=' border border-gray-500'>
                  <th className=' px-4 py-2'>STT</th>
                  <th className=' px-4 py-2'>Emal</th>
                  <th className=' px-4 py-2'>Lastname</th>
                  <th className=' px-4 py-2'>Firstname</th>
                  <th className=' px-4 py-2'>Role</th>
                  <th className=' px-4 py-2'>Phone</th>
                  <th className=' px-4 py-2'>Status</th>
                  <th className=' px-4 py-2'>CreateAt</th>
                  <th className=' px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                    users?.users?.map((el,idx) => (
                      <tr key={el.id} className=' border border-gray-500 '>
                         <td className=' py-2 px-4 '>{idx+1}</td>
                         <td className='py-2 px-4'>{isEdit?._id === el._id ? <InputForm 
                              register={register}
                              style=' w-[130px]'
                              errors={errors}
                              defaultValue={isEdit?.email}
                              id={'email'}
                              validate={{required: true,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "invalid email address"
                                }
                              }}

                         /> : <span>{el.email}</span>}</td>
                         <td className=' py-2 px-4 '>{isEdit?._id === el._id ? <InputForm 
                              register={register}
                              style=' w-[130px]'
                              errors={errors}
                              defaultValue={isEdit?.lastname}
                              id={'lastname'}
                              validate={{required: 'Require fill', pattern: /^[A-Za-z]+$/i}}
                         
                         /> : <span>{el.lastname}</span>}</td>
                         <td className=' py-2 px-4 '>{isEdit?._id === el._id ? <InputForm 
                              register={register}
                              style=' w-[130px]'
                              errors={errors}
                              defaultValue={isEdit?.firstname}
                              id={'firstname'}
                              validate={{required: 'Require fill'}}
                         
                         /> : <span>{el.firstname}</span>}</td>
                         <td className=' py-2 px-4 '>{isEdit?._id === el._id ? <Select 
                                register={register}
                                style=' w-[130px]'
                                errors={errors}
                                defaultValue={el.role}
                                id={'role'}
                                validate={{required: 'Require fill'}}
                                options={roles}

                         /> : <span>{roles.find(role => +role.code === +el.role)?.value}</span>}</td>
                         <td className=' py-2 px-4 '>{isEdit?._id === el._id ? <InputForm 
                              register={register}
                              style=' w-[130px]'
                              errors={errors}
                              defaultValue={isEdit?.mobile}
                              id={'mobile'}
                              validate={{required: 'Require fill', 
                              pattern: {
                                value: /^[62|0]+\d{9}/gi,
                                message: "invalid number phone"
                              }
                              
                            }}
                         
                         /> : <span>{el.mobile}</span>}</td>
                         <td className=' py-2 px-4 '>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                         <td className=' py-2 px-4 '>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                         <td className=' py-2 px-4 '>
                             {isEdit?._id === el._id ? <span className=' px-2 text-orange-600 hover:underline cursor-pointer' onClick={() => handleBack(el)}>Back</span> : 
                             <span className=' px-2 text-orange-600 hover:underline cursor-pointer' onClick={() => setIsEdit(el)}>Edit</span>}
                             <span className=' px-2 text-orange-600 hover:underline cursor-pointer' onClick={()=>handleDelete(el._id)}>Delete</span>
                         </td>
                      </tr>
                    ))
                }
            </tbody>
         </table>
        </form>
        <div className='w-full flex justify-end'>
          <Pagination totalCount={users?.counts}/>
        </div>
      </div>
    </div>
  )
}

export default memo(ManageUser)
