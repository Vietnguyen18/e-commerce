import React, {useState, useEffect} from 'react'
import { apiGetCategories } from '../Api/app'

function Sidebar() {
  const fetchCategories = async () => {
    const response = await apiGetCategories()
    console.log(response);
  }

  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <div>
      Sidebar
    </div>
  )
}

export default Sidebar
