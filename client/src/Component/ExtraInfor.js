import React,{memo} from 'react'

const ExtraInfor = ({icon, title,sub}) => {
  return (
    <div className=' flex items-center p-4 gap-4 border mb-[10px]'>
        <span className=' p-2 bg-gray-800 rounded-full flex items-center justify-center text-white'>{icon}</span>
        <div className=' flex flex-col text-sm '>
            <span className=' text-gray-950'>{title}</span>
            <span className=' text-gray-500'>{sub}</span>
        </div>
    </div>
  )
}

export default memo(ExtraInfor)
