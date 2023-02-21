import GoBack from 'Components/MainScreenLayout/GoBack'
import convertToUppercase from 'Utilities/convertToUppercase'
import React from 'react'
import { useParams } from 'react-router-dom'
import SearchAndSelect from './SearchAndSelect'
import Dropdown from './Dropdown'
import { useState, useEffect } from 'react'


const ProductAssignment = () => {
  const [showLists, setShowLists] = useState(false)
  
  let { customerType } = useParams()
  const selectedItemHandler = (item) => {
    console.log(item)
  }
  useEffect(()=>{

  },[])

  return (
    <div className=' h-screen bg-[#E5E5E5] w-full '>
      <div className='h-[120px] bg-white '>
        <GoBack
          headerText='PRODUCT ASSIGNMENT'
          breadCrumbsList={[
            { text: 'CUSTOMER MANAGEMENT', link: '/' },
            { text: `${convertToUppercase(customerType)} CUSTOMER `, link: '' },
            { text: `PRODUCT ASSIGNMENT`, link: '' },
          ]}
        />
      </div>
      <div className='mx-[2%] my-[2%] flex gap-8'>
        <div className=' w-[100%] bg-white py-[2%] overflow-auto   rounded-md '>
          <div className=' w-full flex gap-12 justify-center items-center'>
            <h1 className='font-normal  text-[18px]'>Product Type</h1>
            <Dropdown showLists={showLists} data={[]} selectedItemHandler={selectedItemHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAssignment
