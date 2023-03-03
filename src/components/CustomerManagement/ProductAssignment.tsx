import GoBack from 'Components/MainScreenLayout/GoBack'
import convertToUppercase from 'Utilities/convertToUppercase'
import React from 'react'
import { useParams } from 'react-router-dom'
import SearchAndSelect from './SearchAndSelect'
import Dropdown from './Dropdown'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAction, getCategorizedProductsAction } from 'Redux/actions/CustomerManagement.actions'
import { ReducersType } from '../../redux/store'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import ProductType from './ProductType'
import ProductsTable from './ProductsTable'

const ProductAssignment = () => {
  const initialRef: any = null
  const dropdownListRef = useRef(initialRef)
  const response = useSelector<ReducersType>((state: ReducersType) => state?.allProductCategories) as customersManagementResponseType
  const allProducts = useSelector<ReducersType>((state: ReducersType) => state?.allProducts) as customersManagementResponseType
  type productCategoryType = 'All' | 'Payment' | 'Credit' | 'Deposit' | 'Investment'
  const allProductCategories = response.serverResponse.data
  const [showLists, setShowLists] = useState(false)
  const [selectedItem, setSelectedItem] = useState<productCategoryType>('All')
  const [activeProductType, setActiveProductType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  let { customerType } = useParams()
  const selectedItemHandler = (item: productCategoryType) => {
    setSelectedItem(item)
    setShowLists(false)
  }

  const searchBarHandler = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (selectedItem === 'All') {
      // dispatch(getAllProductsAction() as any)
      dispatch(getCategorizedProductsAction('') as any)
    }

    if (selectedItem === 'Credit') {
      dispatch(getCategorizedProductsAction(selectedItem) as any)
    }
    if (selectedItem === 'Payment') {
      dispatch(getCategorizedProductsAction(selectedItem) as any)
    }
    if (selectedItem === 'Deposit') {
      dispatch(getCategorizedProductsAction(selectedItem) as any)
    }
    if (selectedItem === 'Investment') {
      dispatch(getCategorizedProductsAction(selectedItem) as any)
    }
  }, [selectedItem])

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

  //  console.log(allProducts)

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

      <div className='  bg-white p-[5%]  h-auto  mx-[2%] my-[2%]    rounded-md '>
        <div className=' w-full flex flex-col  justify-center  items-center'>
          <div className='flex gap-12'>
            <h1 className='font-normal  text-[18px]'>Product Type</h1>
            <div className='top-4'>
              <Dropdown
                selectedItem={selectedItem}
                setShowLists={setShowLists}
                showLists={showLists}
                selectedItemHandler={selectedItemHandler}
                dropdownListRef={dropdownListRef}
              />
            </div>
          </div>
          <div className=' w-full mt-6'>
            <h1 className='font-normal  text-[18px]'>Choose Deposit Product</h1>
            <ProductType
              activeProductType={activeProductType}
              setActiveProductType={setActiveProductType}
              data={allProductCategories}
              selectedItem={selectedItem}
              onChange={searchBarHandler}
              searchTerm={searchTerm}
              
            />
          </div>
          <div className=' w-full mt-6'>
            <ProductsTable searchTerm={searchTerm} activeProductType={activeProductType} data={response} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAssignment
