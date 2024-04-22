import React, { memo} from 'react'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFieds}) => {


  return (
    <div className=' w-full relative'>
        {value.trim() !=='' && <label className=' absolute text-[10px] top-0 block px-2 left-[12px] animate-slide-top-sm' htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}</label>}
      <input 
      type={type || 'text'}
      className='w-full px-4 py-2 my-5 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 '
      placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
      value={value}
      onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
      />
    </div>
  )
}

export default memo(InputField)
