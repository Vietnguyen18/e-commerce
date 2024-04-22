import React,{memo} from 'react'

const Button = ({children,handleOnclick, style, iconBefore, iconAfter, fw, type = 'button' }) => {
  return (
    <button 
    type={type} 
    className=  {style ? style : ` px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 ${fw ? 'w-full' : 'w-fit'}`}
    onClick={()=> {handleOnclick && handleOnclick()}}
    >
      {children} 
    </button>
  )
}

export default memo(Button)