/* eslint-disable react-hooks/exhaustive-deps */
import React,{memo, useState, useEffect} from 'react'
import icons from '../../Ultils/icon'
import { colors } from '../../Ultils/contants'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from '../../Api'


const {AiFillCaretDown } = icons

const SearchItem = ({name, activeClick,ChangeActive, type = 'checkbox'}) => {
    const [selected, setSelected] = useState([])
    const [bestPrice, setBestPrice] = useState(null)
    // const [price, setPrice] = useState({
    //     from: '',
    //     to: '',
    // })
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const {category} = useParams()
    const handlerSelect = (e) =>{
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        ChangeActive(null)
    }
   const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({sort: '-price', limit: 1})
    if(response.success) setBestPrice(response.products[0]?.price)
   }
        
    useEffect(() => {
        if(selected.length > 0){
            let param = []
            for (let i of params.entries()) param.push(i)
            const queries = {}
            for(let i of param) queries[i[0]] = i[1]
            queries.color = selected.join(',')
            queries.page = 1
            navigate({
                pathname:  `/${category}`,
                search: createSearchParams(queries).toString()
            })
        }else{
            navigate(`/${category}`)
        }
    },[selected])
    useEffect(() => {
        if(type === 'input') fetchBestPriceProduct()
    },[type])
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
                                     className=' form-checkbox'
                                     value={el}
                                     onChange={handlerSelect}
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
