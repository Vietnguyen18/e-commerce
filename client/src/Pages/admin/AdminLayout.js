import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import path from '../../Ultils/path'
import { useSelector } from 'react-redux'
import AdminSidebar from '../../Component/Sidebar/AdminSidebar'

const AdminLayout = () => {
  const {isLoggedIn, current} = useSelector(state => state.user)
  console.log({isLoggedIn, current});
  if(!isLoggedIn || !current || +current.role !== 101) return <Navigate  to={`/${path.LOGIN}`} replace={true}/>
  return (
    <div className=' flex w-full bg-slate-100 min-h-screen relative'>
      <div className=' w-[300px] flex-none fixed top-0 bottom-0'>
        <AdminSidebar />
      </div>
      <div className=' w-[310px]'>

      </div>
      <div className=' flex-auto'>
        <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout
