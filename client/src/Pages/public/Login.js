/* eslint-disable react-hooks/exhaustive-deps */
import React,{memo, useCallback, useState} from 'react'
import { Button, InputField, Loading } from '../../Component'
import { apiRegister, apiLogin } from '../../Api/user'
import Swal from 'sweetalert2'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import path from '../../Ultils/path'
import {login} from '../../Store/user/userSlice'
import { useDispatch } from 'react-redux'
import {showmodal} from '../../Store/app/appSlice'
import { RingLoader } from 'react-spinners'

const Login = ()  => {
    const [payLoad, setPayLoad] = useState({
      email:'',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })

    //dispatch
    const dispatch = useDispatch()
    //
    const [isLoading, setIsLoading] = useState(false);
    

    //reset
    const resetPayload = () => {
      setPayLoad({
        email:'',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
      })
    }
    // Navigate
    const navigate = useNavigate()
    // Location
    const location = useLocation()
    console.log(location);

    const [isRegister, setIsRegister] = useState(false)
    const handleSubmit = useCallback(async() => {
      setIsLoading(true)
        const {firstname, lastname, mobile ,...data} = payLoad
        if (isRegister) {
          dispatch(showmodal({isShowModal: true, modalChildren: <Loading /> }))
          const response = await apiRegister(payLoad)
          dispatch(showmodal({isShowModal: false, modalChildren: null }))
          if(response.success){
            Swal.fire('Congratulation', response.mes,'success').then(() =>{
              setIsRegister(false)
              resetPayload()
            })
          }else{
            Swal.fire('Oops !!', response.mes,'error')
          }
        }
        else{
          const rs = await apiLogin(data)
          setIsLoading(false)
          if(rs.success){
            dispatch(login({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
            navigate(`/${path.HOME}`)
          }else{
            Swal.fire('Oops !!', rs.mes,'error')
          }
          window.location.reload()
        }
    },[payLoad, isRegister])
  return (
    <div className=' w-screen h-screen relative'>
        <img src='https://i.pinimg.com/564x/72/38/b2/7238b24f8178be3a503cae06c28b5ee8.jpg' alt=' background login ' className=' w-full h-full object-cover'/>
        <div className=' absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
             <div className=' p-8 bg-white rounded-md min-w-[500px]'>
                <h1 className=' text-2xl font-semibold text-purple-700 mb-8 text-center'>
                  {isRegister ? 'Register' : 'Login'}
                </h1>
                {isRegister && <div className=' flex items-center gap-2'>
                      <InputField value={payLoad.firstname} setValue={setPayLoad} nameKey='firstname' />
                      <InputField value={payLoad.lastname} setValue={setPayLoad} nameKey='lastname' />
                  </div>}
                <InputField value={payLoad.email} setValue={setPayLoad} nameKey='email' />
                {isRegister && <InputField value={payLoad.mobile} setValue={setPayLoad} nameKey='mobile' />}
                <InputField value={payLoad.password} type='password' setValue={setPayLoad} nameKey='password' />
                <Button 
                  children= {isRegister ? 'Register' : 'Login'} 
                  handleOnclick={handleSubmit}
                  fw
                />
                <div className=' flex w-full items-center justify-between my-2 text-sm'>
                    {!isRegister && <span className=' text-xs text-purple-600 hover:underline cursor-pointer'>Forgot your account</span>}
                    {!isRegister && <span className=' text-xs text-purple-600 hover:underline cursor-pointer' onClick={()=> setIsRegister(true)}>Create account</span>}
                    {isRegister && <span className=' text-xs text-purple-600 hover:underline cursor-pointer w-full text-center' onClick={()=> setIsRegister(false)}>Login</span>}
                </div>
                <Link className=' text-sm text-main hover:underline cursor-pointer w-full text-center' to={`/${path.HOME}`} >Go Home Page?</Link>
             </div>
        </div>
        {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <RingLoader color='#F37A24' size={60} loading={isLoading} />
                </div>
            )}
    </div>
  )
}

export default memo(Login)
