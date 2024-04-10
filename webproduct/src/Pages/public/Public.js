import React from 'react'
import { Outlet } from 'react-router-dom' //tuong trung cho component con
import {Header, Navigation} from '../../Component'
import banner from '../../Assets/1712052486176_untitled_1_01_3.avif'

function Public() {
  return <>
        <div className='w-full flex flex-col items-center '>
              <img src={banner} className=' w-main h-10' alt='ảnh gốc' />
              <Header/>
              <Navigation/>
          <div className='w-main'>
            <Outlet />
          </div>
        </div>
  </>
}

export default Public
