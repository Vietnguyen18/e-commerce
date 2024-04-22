import React, {memo} from 'react'

const CountDown = ({unit, number}) => {
  return (
    <div className=' w-[30%] h-[60px] flex justify-center items-center border rounded-md bg-gray-100 flex-col'>
      <span className='text-[18px] text-gray-500'>{number}</span>
      <span className='text-xs text-gray-700'>{unit}</span>
    </div>
  )
}

export default memo(CountDown)
