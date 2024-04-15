import React from 'react'
import logo from '../Assets/logobanner.png'
import icons from "../Ultils/icon"
import {Link} from 'react-router-dom'
import path from '../Ultils/path'

function Header() {
    const {FaPhoneAlt, FaMapMarkerAlt,BsBoxSeam,FaBagShopping,FaUserCircle} = icons
  return (
    <div className='border w-main h-[110px] flex justify-between '>
        <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className='w-[320px] object-contain'/>
        </Link>
        <div className='flex relative flex-col w-[340px]'>
            <div className='mx-auto w-full text-gray-600 pt-5'>
                <input type='text' placeholder='Tìm Kiếm.....' className='h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-4 pr-16 text-sm focus:outline-none'/>
                <span className='absolute right-0 top-7 mr-4'>
                    <button aria-label='search' type="button" className="flex items-center justify-center">
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m23.233 21.86-5.712-5.94a9.66 9.66 0 0 0 2.273-6.23c0-5.343-4.347-9.69-9.69-9.69C4.763 0 .415 4.347.415 9.69c0 5.343 4.348 9.69 9.69 9.69a9.586 9.586 0 0 0 5.552-1.753l5.755 5.985c.241.25.565.388.911.388a1.265 1.265 0 0 0 .91-2.14ZM10.104 2.528c3.95 0 7.163 3.213 7.163 7.162 0 3.95-3.213 7.162-7.162 7.162-3.95 0-7.163-3.213-7.163-7.162 0-3.95 3.213-7.162 7.162-7.162Z" fill="#BE1E2D"></path></svg>
                    </button>
                </span>
            </div> 
            <div className='w-full py-2 flex items-center justify-center '>
                    <p className='px-2 text-[10px] font-bold  text-black hover:underline'>iPhone 15 Pro Max</p>
                    <p className='px-2 text-[10px] font-bold  text-black hover:underline'>iPhone 15 Pro Max</p>
                    <p className='px-2 text-[10px] font-bold  text-black hover:underline'>iPhone 15 Pro Max</p>
            </div>
        </div>
        <div className='flex text-[13px] gap-1 pl-3 pt-5'>
            <div>
                <span className='flex gap-5 items-center'>
                    <FaPhoneAlt className='w-6 h-6'/>
                    <span className='font-semibold text-black hover:underline'>
                        (+84) 087 6466 865
                    </span>
                </span>
            </div>
            <div>
                <span className='flex gap-5 items-center'>
                    <FaMapMarkerAlt className='w-6 h-6'/>
                    <span className='font-semibold text-black hover:underline'>
                        Cửa hàng ở gần bạn
                    </span>
                </span>
            </div>
            <div>
                <span className='flex gap-5 items-center'>
                    <BsBoxSeam className='w-6 h-6'/>
                    <span className='font-semibold text-black hover:underline'>
                        Tra cứu đơn hàng
                    </span>
                </span>
            </div>
            <div>
                <span className='flex gap-5 items-center'>
                    <FaBagShopping className='w-6 h-6'/>
                    <span className='font-semibold text-black hover:underline'>
                        Giỏ hàng
                    </span>
                </span>
            </div>
            <div>
                <span className='flex gap-5 items-center'>
                    <FaUserCircle className='w-6 h-6'/>
                    <span className='font-semibold text-black hover:underline'>
                        Đăng kí / Đăng nhập
                    </span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Header
