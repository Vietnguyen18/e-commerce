import { useMemo } from 'react'
import { generateRange} from '../../Ultils/help'
import { HiDotsHorizontal } from "react-icons/hi";


const usePagination = (totalPagination, currentPage, siblingCount = 1) => {
    const paginationArray = useMemo(() => {
        const pageSize = +process.env.REACT_APP_LIMIT || 10 
        const paginationCount = Math.ceil(+totalPagination / pageSize)
        const totalPaginationItem = +siblingCount + 5

        if(paginationCount <= totalPaginationItem) return generateRange(1, paginationCount)
        const isShowLeft = currentPage - siblingCount > 2
        const isShowRight = currentPage + siblingCount < paginationCount - 1

        if(isShowLeft && !isShowRight) {
            const rightStart = siblingCount - 4 
            const rightRange = generateRange(rightStart, paginationCount)
            return [ 1, <HiDotsHorizontal /> , ...rightRange]
        }

        if(!isShowLeft && isShowRight){
            const leftRange = generateRange(1,5)
            return [...leftRange, <HiDotsHorizontal />, paginationCount]
        }

        const siblingLeft = Math.max(currentPage - siblingCount,1)
        const siblingRight = Math.min(currentPage + siblingCount, paginationCount)

        if(isShowLeft && isShowRight){
            const middleRange = generateRange(siblingLeft, siblingRight)
            return [1, <HiDotsHorizontal />, ...middleRange, <HiDotsHorizontal />, paginationCount]
        }



    },[totalPagination, currentPage, siblingCount])



    return paginationArray
}

export default usePagination

// fist + last + current + sibling + 2*DOTS
// min = 6 => sibling + 5
// totalPagination : 58, limitProduct = 10 => 5.8 = 6
// totalPaginationItem: sibling + 5 = 6
// sibling = 1
// [1,2,3,4,5,6]
// [1,...,6,7,8,9,10]
//[1,2,3,4,5,...,10]