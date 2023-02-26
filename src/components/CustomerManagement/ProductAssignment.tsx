import GoBack from 'Components/MainScreenLayout/GoBack'
import convertToUppercase from 'Utilities/convertToUppercase'
import React from 'react'
import { useParams } from 'react-router-dom'
import SearchAndSelect from './SearchAndSelect'
import Dropdown from './Dropdown'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategorizedProductsAction } from 'Redux/actions/CustomerManagement.actions'
import { ReducersType } from '../../redux/store'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import ProductType from './ProductType'
import ProductTypesTable from './ProductTypesTable'

const ProductAssignment = () => {
  const initialRef: any = null
  const dropdownListRef = useRef(initialRef)
  const response = useSelector<ReducersType>((state: ReducersType) => state?.allProductCategories) as customersManagementResponseType
  const allProductCategories = response.serverResponse.data
  const [showLists, setShowLists] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const dispatch = useDispatch()

  let { customerType } = useParams()
  const selectedItemHandler = (item) => {
    setSelectedItem(item)
    setShowLists(false)
  }
  useEffect(() => {
    dispatch(getCategorizedProductsAction() as any)
  }, [])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showLists && dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
        setShowLists(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showLists])

  // console.log(allProductCategories)

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

      <div className='  bg-white p-[5%]  h-auto overflow-auto mx-[2%] my-[2%]    rounded-md '>
        <div className=' w-full flex flex-col  justify-center border items-center'>
          <div className='flex gap-12'>
            <h1 className='font-normal  text-[18px]'>Product Type</h1>
            <div className=''>
              <Dropdown
                selectedItem={selectedItem}
                setShowLists={setShowLists}
                showLists={showLists}
                data={allProductCategories}
                selectedItemHandler={selectedItemHandler}
                dropdownListRef={dropdownListRef}
              />
            </div>
          </div>
          <div className=' w-full mt-6'>
            <h1 className='font-normal  text-[18px]'>Choose Deposit Product</h1>
            <ProductType data={allProductCategories} selectedItem={selectedItem} />
          </div>
          <div className='border w-full mt-6'>
            <ProductTypesTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAssignment
