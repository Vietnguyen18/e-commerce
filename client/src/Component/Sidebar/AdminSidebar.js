import React,{memo, Fragment, useState} from 'react'
import logo from '../../Assets/logohang.png'
import { adminSidebar } from '../../Ultils/contants'
import { NavLink, Link } from 'react-router-dom'
import clxs from 'clsx'
import { AiOutlineCaretDown, AiOutlineCaretLeft } from 'react-icons/ai'
import { BiLogOut } from "react-icons/bi";
import path from '../../Ultils/path'



    const activedStyle = 'px-4 py-2 flex item-center gap-2 text-gray-200 bg-gray-500 '
    const notActivedStyle = 'px-4 py-2 flex item-center gap-2 text-gray-200 hover:bg-gray-600'

const AdminSidebar = () => {
    const [actived, setActived] = useState([])
    const handleShowTabs = (tabID) =>{
        if(actived.some(el=>el === tabID)) setActived(prev => prev.filter(el=> el !== tabID))
        else setActived(prev => [...prev, tabID])
    }


  return (
    <div className=' bg-sky-800 h-full py- 4'>
        <Link to={`/${path.HOME}`} ><BiLogOut size={30} className=' text-white left-2 flex w-[30px]'/></Link>
        <div className=' flex flex-col items-center justify-center p-4'>
            <img src={logo} alt='logo' className=' w-[150px] object-contain'  />
            <small className=' text-center flex items-center text-white text-xl'>Admin Workspace</small>
        </div>
        <div>
            {
                adminSidebar?.map(el => (
                    <Fragment key={el.id}>
                        {
                            el.type === 'SINGLE' && <NavLink to={el.path} className={({isActive})=> clxs(isActive && activedStyle, !isActive && notActivedStyle )}>
                                <span>{el.icons}</span>
                                <span>{el.text}</span>
                            </NavLink>
                        }
                        {
                            el.type === 'PARENT' && <div className='px-4 py-2 flex item-center flex-col text-gray-200' onClick={()=> handleShowTabs(el.id)}>
                                <div className=' flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-600'>
                                    <div className='flex items-center gap-2'>
                                        <span>{el.icons}</span>
                                        <span>{el.text}</span>
                                    </div>
                                {actived.some(id=> id===el.id) ?  <AiOutlineCaretDown/> : <AiOutlineCaretLeft />  }
                                </div>
                                {actived.some(id => id === el.id) && <div className=' flex flex-col pl-4 ' >
                                    {
                                        el.submenu.map(item => (
                                            <NavLink to={item.path} key={item.text} 
                                            className={({isActive})=> clxs(isActive && activedStyle, !isActive && notActivedStyle )}
                                            onClick={e=> e.stopPropagation()}
                                            >
                                                {item.text}
                                            </NavLink>
                                        ))
                                    }
                                </div>}
                            </div>
                        }
                    </Fragment>
                ))
            }
        </div>
    </div>
  )
}

export default memo(AdminSidebar)
