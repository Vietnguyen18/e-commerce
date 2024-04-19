import React,{memo} from 'react'

const Button = ({name, handleOnclick, style, iconBefore, iconAfter, fw }) => {
  return (
    <button 
    type='button' 
    className=  {style ? style : ` w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 ${fw ? 'w-full' : 'w-fit'}`}
    onClick={()=> {handleOnclick && handleOnclick()}}
    >
      { iconBefore }
      <span>{name}</span>
      { iconAfter }
    </button>
  )
}

export default memo(Button)