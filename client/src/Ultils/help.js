import icons from "./icon"

const { AiFillStar, AiOutlineStar } = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()
export const renderStarFromNumber = (number) => {
    if(!Number(number)) return
    // 4 => [1.1.1.1.0]
    //  => [1.1.0.0.0]
    const stars = []
    for (let i = 0; i< +number; i++) stars.push(<AiFillStar color="orange"/>)
    for (let i = 5; i> +number; i--) stars.push(<AiOutlineStar color="orange"/>)
    
    return stars
}

export function secondsTohms(d) {
    d = Number(d) / 1000
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor ( d % 3600 % 60 )
    return({h,m,s})
}