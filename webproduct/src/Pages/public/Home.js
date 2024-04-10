import React from 'react'
import {Sidebar, Banner } from '../../Component'
function Home() {
  return (
    <div className='w-main flex'>
        <div className='flex flex-col w-[25%] gap-5 flex-auto border'>
            <Sidebar />
            <span>Deal Daily</span>
        </div>
        <div className='flex flex-col w-[75%] gap-5 mx-2 p-4 flex-auto border'>
            <Banner />
            <span>Best Sale</span>
        </div>
    </div>
  )
}

export default Home
