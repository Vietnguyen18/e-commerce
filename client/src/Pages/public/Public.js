import React, {memo} from 'react'
import { Outlet } from 'react-router-dom' //tuong trung cho component con
import banner from '../../Assets/1712052486176_untitled_1_01_3.avif'
import { Footer, Header, Navigation, TopHeader } from '../../Component'

const Public = () => {
  return <>
        <div className='w-full flex flex-col items-center '>
              <TopHeader />
              <img src={banner} className=' w-main h-10' alt='ảnh gốc' />
              <Header/>
              <Navigation/>
          <div className='w-main'>
              <Outlet />
          </div>
          <div className='w-full'>
            <Footer />
          </div>

        </div>

  </>
}

export default memo(Public)
