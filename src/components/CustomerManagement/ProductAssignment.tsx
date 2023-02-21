import GoBack from 'Components/MainScreenLayout/GoBack'
import convertToUppercase from 'Utilities/convertToUppercase'
import React from 'react'
import { useParams } from 'react-router-dom'
import SearchAndSelect from './SearchAndSelect'

const ProductAssignment = () => {
  let { customerType } = useParams()

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
          
          <div className='border w-full flex gap-4'>
            <SearchAndSelect fieldlabel=''/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAssignment
