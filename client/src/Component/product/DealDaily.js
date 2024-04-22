import React, {useEffect , useState, memo} from 'react'
import icons from '../../Ultils/icon'
import { apiGetProducts } from '../../Api/product'
import {renderStarFromNumber,formatMoney} from '../../Ultils/help'
import CountDown from '../common/CountDown'
import { secondsTohms } from '../../Ultils/help'

const {AiFillStar, AiOutlineMenu} = icons
let idInterval

const DealDaily = () => {

  const [dealDaily, setDealDaily] = useState(null)
  const [isHour, setIsHour] = useState(0)
  const [isMinute, setIsMinute] = useState(0)
  const [isSecond, setIsSecond] = useState(0)
  const [isExpireTime, setIsExpireTime] = useState(false)
  //
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({limit: 1, page: Math.round(Math.random()*20), totalRatings: 3})
    console.log(response);
      if(response.success) {
        setDealDaily(response.products[0])
        const today = new Date();
        const formattedToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()} 5:00:00`;
        const seconds = new Date(formattedToday).getTime() - new Date().getTime() + 24 * 3600 * 1000
        console.log(seconds)
        const number = secondsTohms(seconds)
        setIsHour(number.h)
        setIsMinute(number.m)
        setIsSecond(number.s)
      }else{
        setIsHour(0)
        setIsMinute(59)
        setIsSecond(59)
      }
    }

  // useEffect(() => {
  //   fetchDealDaily()
  // },[])
  useEffect(()=> {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  },[isExpireTime])
  useEffect(() => {
    idInterval = setInterval(() => {
      if(isSecond > 0){
        setIsSecond(prev => prev - 1)
      }
      else{
        if(isMinute > 0){
          setIsMinute(prev => prev - 1)
          setIsSecond(59)
        }else{
          if(isHour > 0){
            setIsHour(prev => prev - 1)
            setIsMinute(59)
            setIsSecond(59)
          }else{
            setIsExpireTime(!isExpireTime)
          }
        }
      }
    },1000)
    return () => {
      clearInterval(idInterval)
    }
  },[isHour,isMinute,isSecond,isExpireTime])

  
  return (
    <div className=' border w-full flex-auto p-4'>
        <div className='flex items-center justify-between m-1'>
           <span className='flex-2 flex justify-center'><AiFillStar color='red' size={20}/></span>
           <span className='flex-5 font-bold text-[20px] flex justify-center'>DEAL DAILY</span>
           <span className='flex-3'></span>
        </div>
        <div className='w-full flex flex-col items-center py-4'>
          <img src={dealDaily?.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkfJ5oMZl37l-4wuTZz28Om-VQV9e88XjKten66LPwvA&s'} alt='' className='w-full object-contain p-4'/>
          <div className='flex flex-col gap-1 mt-[15px] w-full items-center '>
                    <span className=' line-clamp-1'>{dealDaily?.title}</span>
                    <span className=' flex py-2'>{renderStarFromNumber(dealDaily?.totalRatings)}</span>
                    <span className=' py-2'>{`${formatMoney(dealDaily?.price)} VND`}</span>
                </div>
        </div>
        <div className=' px-4 mt-4  '>
          <div className='flex justify-center gap-2 items-center mb-8'>
            <CountDown unit={'Hour'} number={isHour}/>
            <CountDown unit={'Minutes'} number={isMinute}/>
            <CountDown unit={'Seconds'} number={isSecond}/>
          </div>
          <button type='button' className='flex gap-2 items-center justify-center w-full h-[40px] bg-main hover:bg-gray-800  text-white font-medium'>
              <AiOutlineMenu/> 
              <span>Options</span>
          </button>
        </div>
    </div>
  )
}

export default memo(DealDaily)
