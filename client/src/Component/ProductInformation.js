import React,{memo, useState} from 'react'
import {tabs} from '../Ultils/contants'


//   const activedStyles = ''
//   const notActiveStyles =''

const ProductInformation = () => {
    const [activedtab, setActivedTab] = useState(1)
  return (
    <div className=''>
       <div className=' flex items-center gap-2 relative bottom-[1px]'>
            {tabs.map(el => (
                <span key={el.id} className={`py-2 px-4 cursor-pointer ${activedtab === +el.id ? ' bg-white border border-b-0 ' : 'bg-gray-200'} `} onClick={()=> setActivedTab(el.id)}>{el.title}</span>
            ))}
       </div>
       <div className=' w-full  border p-4'>
          {tabs?.some(el=>el.id === activedtab) && tabs?.find(el =>el.id === activedtab)?.content}
       </div>
    </div>
  )
}

export default memo(ProductInformation)
