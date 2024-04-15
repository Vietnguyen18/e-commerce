import React from 'react'

const SelectOption = ({icon}) => {
  return (
    <div className=' w-10 h-10 bg-white rounded-full border shadow-sm flex justify-center items-center hover:bg-slate-800 hover:text-white cursor-pointer'>
      {icon}
    </div>
  )
}

export default SelectOption
