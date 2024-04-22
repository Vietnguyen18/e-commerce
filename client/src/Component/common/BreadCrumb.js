import React from 'react'
import useBreadCrumb from 'use-react-router-breadcrumbs'
import { Link } from 'react-router-dom';
import icons from '../../Ultils/icon';

const {IoIosArrowForward} = icons
const BreadCrumb = ({title, category}) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
      ];
    const breadCrumbs = useBreadCrumb(routes)
    // console.log(breadCrumbs);
  return (
    <div>
      <div className=' text-sm flex items-center gap-1'>
      {breadCrumbs?.filter(el => !el.match.route === false).map(({ match, breadcrumb}, index, self) => (
        <Link className='flex items-center hover:text-main gap-1' key={match.pathname} to={match.pathname}>
          <span className=' capitalize'>{breadcrumb} </span>
          {
            index !== self.length - 1 && <IoIosArrowForward /> 
          }
        </Link>
      ))}
      </div>
    </div>
  )
}

export default BreadCrumb