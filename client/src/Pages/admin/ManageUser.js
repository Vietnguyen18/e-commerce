/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{memo, useEffect,useState} from 'react'
import { apiGetUser } from '../../Api'
import { roles } from '../../Ultils/contants'
import moment from 'moment'
import { InputField } from '../../Component'
// import useDebounce from '../../Component/hooks/useDebounce'

const ManageUser = () => {
  const [users, setUser] = useState(null)
  const [queries, setQueries] = useState({
    q: ''
  })

  const fetchUsers = async(params) =>{
    const response = await apiGetUser(params)
    if(response.success) setUser(response)
  }
  // const queriesDebounce = useDebounce(queries.q,800)
    useEffect(() => {
      fetchUsers()
    },[])
console.log(queries);
  return (
    <div className=' w-full'>
      <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
            <span> Manage User</span>
      </h1>
      <div className=' w-full p-4'>
        <div className=' flex justify-end py-4'>
            <InputField 
              nameKey={'q'}
              value={queries.q}
              setValue={setQueries}
              style='w-[500px]'
              placeholder='Search name user....'
              isHideLabel
            />
        </div>
         <table className=' table-auto mb-6 text-left w-full'>
            <thead className=' font-bold bg-gray-600 text-sm  text-white'>
              <tr className=' border border-gray-500'>
                  <th className=' px-4 py-2'>Stt</th>
                  <th className=' px-4 py-2'>Emal</th>
                  <th className=' px-4 py-2'>Fullname</th>
                  <th className=' px-4 py-2'>Role</th>
                  <th className=' px-4 py-2'>Phone</th>
                  <th className=' px-4 py-2'>Status</th>
                  <th className=' px-4 py-2'>CreateAt</th>
                  <th className=' px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                    users?.users?.map((el,idx) => (
                      <tr key={el.id} className=' border border-gray-500 '>
                         <td className=' py-2 px-4 '>{idx+1}</td>
                         <td className=' py-2 px-4 '>{el.email}</td>
                         <td className=' py-2 px-4 '>{`${el.lastname} ${el.firstname}`}</td>
                         <td className=' py-2 px-4 '>{roles.find(role => role.role === el.role)?.value}</td>
                         <td className=' py-2 px-4 '>{el.mobile}</td>
                         <td className=' py-2 px-4 '>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                         <td className=' py-2 px-4 '>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                         <td className=' py-2 px-4 '>
                             <span className=' px-2 text-orange-600 hover:underline cursor-pointer'>Edit</span>
                             <span className=' px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                         </td>
                      </tr>
                    ))
                }
            </tbody>
         </table>
      </div>
    </div>
  )
}

export default memo(ManageUser)
