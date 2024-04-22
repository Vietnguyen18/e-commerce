/* eslint-disable react-hooks/exhaustive-deps */
import React,{memo, useState, useEffect} from 'react'
import icons from '../../Ultils/icon'
import { colors } from '../../Ultils/contants'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'


const {AiFillCaretDown } = icons

const SearchItem = ({name, activeClick,ChangeActive, type = 'checkbox'}) => {
    const [selected, setSelected] = useState([])
    const navigate = useNavigate()
    const {category} = useParams()
    const handlerSelect = (e) =>{
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        ChangeActive(null)
    }
    console.log(selected);
        
    useEffect(() => {
        navigate({
            pathname:  `/${category}`,
            search: createSearchParams({
                color: selected.join(',')
            }).toString()
        })
    },[selected])
  return (
    <div onClick={()=>ChangeActive(name)} className=' p-4 text-sm relative border-gray-800 justify-between items-center flex gap-6 border text-gray-500'>
        <span className=' capitalize '>{name}</span>
        <AiFillCaretDown />
        { activeClick === name && <div className=' absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border min-w-[150px] bg-white'>
            {type === 'checkbox' && 
                <div className=' p-2 '>
                    <div className=' p-4 items-center flex justify-center gap-8 border-b'>
                        <span className=' whitespace-nowrap'>
                            {`${selected.length} selected`}
                        </span>
                        <span className=' underline cursor-pointer hover:text-main' 
                        onClick={e => 
                           { e.stopPropagation()
                            setSelected([])}
                        }>
                            Reset
                        </span>
                    </div>
                    <div onClick={e=> e.stopPropagation()} className=' flex flex-col gap-3 mt-4'>
                        {
                            colors.map((el,index)=>(
                                <div key={index} className=' flex items-center gap-4'>
                                    <input
                                     type='checkbox' 
                                     className=' w-4 h-4 rounded border-gray-300 focus:ring-blue-500'
                                     value={el}
                                     onClick={handlerSelect}
                                     id={el}
                                     checked={selected.some(selectedItem => selectedItem === el)}
                                     />
                                    <label className=' capitalize text-gray-700 ' htmlFor={el}>{el}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            </div>
            }
    </div>
  )
}

export default memo(SearchItem)
