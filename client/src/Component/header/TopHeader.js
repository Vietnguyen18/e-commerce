import React, {memo,useEffect} from 'react'
import { Link } from 'react-router-dom'
import path from '../../Ultils/path'
import { getCurrent } from '../../Store/user/asysnActions'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../Ultils/icon'
import { logout } from '../../Store/user/userSlice'

const {FiLogOut} = icons

const TopHeader = () => {
  const dispatch = useDispatch()
    const {isLoggedIn, current} = useSelector(state => state.user)

    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrent())
    },[dispatch,isLoggedIn])
  return (
    <div className=' h-[38px] w-full bg-main flex items-center justify-center'>
      <div className=' w-main flex items-center justify-between text-xs text-white font-bold cursor-pointer'>
          <span>ORDER ONLINE OR CALL US (+84) 034.3169.245</span>
          {isLoggedIn ? <div className=' flex gap-4 text-sm items-center'>
              <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
              <span className=' hover:rounded-full hover:bg-gray-200 p-2 hover:text-main' onClick={()=> dispatch(logout())}><FiLogOut size={18}/></span>
            </div> : <Link className=' hover:text-gray-800' to={`/${path.LOGIN}`}>Sign In or Create Account</Link>}
        </div>
    </div>
  ) 
}

export default memo(TopHeader)
