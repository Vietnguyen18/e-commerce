import React, {memo} from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' w-full'>
      <footer className="flex w-full  flex-col items-center justify-center border-t border-gray-200 bg-white pt-5 text-left ">
                <div className="max-w-[1200px]">
                        <div className="w-full border-b border-black">
                                <div className="flex w-full items-start justify-start">
                                    {/* Support */}
                                    <div className="w-1/4">
                                        <div className="flex flex-col">
                                            <p className="my-2 text-sm font-bold text-[red]">
                                                Hỗ trợ khách hàng
                                            </p>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Danh sách cửa hàng
                                            </Link>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Mua hàng trả góp
                                            </Link>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Tra cứu điểm thành viên
                                            </Link>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Tuyển dụng mới nhất
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Policy */}
                                    <div className="w-1/4">
                                        <div className="flex flex-col">
                                            <p className="my-2 text-sm font-bold text-[red]">
                                                Chính sách
                                            </p>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Chính sách bảo hành 
                                            </Link>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Chính sách đổi trả
                                            </Link>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Chính sách bán hàng
                                            </Link>
                                            <Link to={''} className="my-1 mx-0 text-sm font-normal text-black hover:text-[#b74a4a]">
                                                Xem thêm
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Contact */}
                                    <div className="w-1/4">
                                        <div className="flex flex-col">
                                            <p className="my-2 text-sm font-bold text-[red]">
                                                Liên hệ
                                            </p>
                                            {/* Contents */}
                                                <div className="flex flex-col w-full">
                                                    <div className="flex  items-center justify-between py-1 w-[90%] m-0">
                                                        <p className="text-sm font-medium hover:text-[#b74a4a] ">Kỹ thuật</p>
                                                        <div className="flex items-center justify-end pl-4">
                                                            <p className=" text-base font-bold text-[#503ab4] hover:text-[#b74a4a]"><a href="tel: 0343169245 ">0343169245</a></p>
                                                            <p className="pl-2 text-sm font-normal text-black">(8:00-22:00)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <div className="flex  items-center justify-between py-1 w-[90%] m-0">
                                                        <p className="text-sm font-medium hover:text-[#b74a4a]">Bảo trì:</p>
                                                        <div className="flex items-center justify-end pl-4">
                                                            <p className=" text-base font-bold text-[#503ab4] hover:text-[#b74a4a]"><a href="tel: 0343169245 ">0343169245</a></p>
                                                            <p className="pl-2 text-sm font-normal text-black">(10:00-20:00)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <div className="flex  items-center justify-between py-1 w-[90%] m-0">
                                                        <p className="text-sm font-medium hover:text-[#b74a4a]">Đóng góp ý kiến:</p>
                                                        <div className="flex items-center justify-end pl-4">
                                                            <p className=" text-base font-bold text-[#503ab4] hover:text-[#b74a4a]"><a href="tel: 0343169245 ">0343169245</a></p>
                                                            <p className="pl-2 text-sm font-normal text-black">(8:00-22:00)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    {/* Name of the store */}
                                    <div className="w-1/4">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col w-full">
                                                    <div className="flex  items-center justify-between py-1 m-4">
                                                        <p className="text-sm font-medium hover:text-[#b74a4a]">Thiết Bị Di Động Đức Việt</p>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
                <div className="w-full bg-slate-400 h-12 flex justify-center">
                    <p className="max-w-[960px] text-black text-xs m-2 text-center">
                        Công ty TNHH Công Nghệ Thiết Bị Di Động Đức Việt - Xóm hạ, Phú Vinh, Phú Nghĩa, Chương Mỹ, Hà Nội.
                        Mã số doanh nghiệp: 0343169245.Chủ sở hữu: Nguyễn Đức Việt - Điện Thoại: 0343169245 - Email: vietnguyenduc1806@gmail.com
                    </p>
                </div>
            </footer>
    </div>
  )
}

export default memo(Footer)
