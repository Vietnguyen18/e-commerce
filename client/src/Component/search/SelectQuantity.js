import React,{memo} from 'react'
import icons from '../../Ultils/icon'

const {AiOutlinePlus,AiOutlineMinus} = icons

const SelectQuantity = ({quantity, handleQuantity,handleChangeQuantity}) => {
  return (
    <div className=' flex items-center mt-3'>
      <span onClick={()=>handleChangeQuantity('minus')} className='p-3 cursor-pointer border-r border-black'><AiOutlineMinus/></span>
      <input type='text' className=' py-2 px-3 outline-none w-[50px] text-center' value={quantity} onChange={e => handleQuantity(e.target.value)} />
      <span onClick={()=>handleChangeQuantity('plus')} className='p-3 cursor-pointer border-l border-black'><AiOutlinePlus/></span>
    </div>
  )
}

export default memo(SelectQuantity)
