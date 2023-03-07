import GoBack from 'Components/MainScreenLayout/GoBack'
import convertToUppercase from 'Utilities/convertToUppercase'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchAndSelect from './SearchAndSelect'
import Dropdown from './Dropdown'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductTypesAction, getAllProductsAction, getCategorizedProductsAction } from 'Redux/actions/CustomerManagement.actions'
import { ReducersType } from '../../redux/store'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import ProductType from './ProductType'
import ProductsTable from './ProductsTable'
import Button from 'Components/Shareables/Button'
import { getCustomerProfileAction } from '../../redux/actions/CustomerManagement.actions'
import getCustomerDetail from 'Utilities/getCustomerDetail'

const ProductAssignment = () => {
  const initialRef: any = null
  const dropdownListRef = useRef(initialRef)
  const response = useSelector<ReducersType>((state: ReducersType) => state?.allProductCategories) as customersManagementResponseType
  const customerProfileResponse = useSelector<ReducersType>((state: ReducersType) => state?.customerProfile) as customersManagementResponseType
  const allProductTypes = useSelector<ReducersType>((state: ReducersType) => state?.allProductTypes) as customersManagementResponseType
  type productCategoryType = 'All' | 'Payment' | 'Credit' | 'Deposit' | 'Investment'
  const customerProfile = customerProfileResponse.serverResponse.data
  const [showLists, setShowLists] = useState(false)
  const [assignButtonDisabled, setAssignButtonDisabled] = useState(true)
  const [toBeAssignedProductsIds, setToBeAssignedProductsIds] = useState([])
  const [selectedItem, setSelectedItem] = useState<productCategoryType>('All')
  const [activeProductType, setActiveProductType] = useState({ name: '', id: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let { customerId } = useParams()
  const selectedItemHandler = (item: productCategoryType) => {
    setSelectedItem(item)
    setShowLists(false)
  }

  const searchBarHandler = (event) => {
    setSearchTerm(event.target.value)
  }

  const selectProductsToBeAssigned = (productId: string) => {
     const existingId = toBeAssignedProductsIds.find((id) => id === productId)
     if(!existingId){
      
     }
    console.log(productId)
  }

  useEffect(() => {
    const productTypeId = activeProductType.id
    if (activeProductType.name === '' && productTypeId === '') {
      if (selectedItem === 'All') {
        dispatch(getCategorizedProductsAction('') as any)
        dispatch(getAllProductTypesAction() as any)
      }

      if (selectedItem === 'Credit') {
        dispatch(getCategorizedProductsAction(selectedItem) as any)
        dispatch(getAllProductTypesAction() as any)
      }
      if (selectedItem === 'Payment') {
        dispatch(getCategorizedProductsAction(selectedItem) as any)
        dispatch(getAllProductTypesAction() as any)
      }
      if (selectedItem === 'Deposit') {
        dispatch(getCategorizedProductsAction(selectedItem) as any)
        dispatch(getAllProductTypesAction() as any)
      }
      if (selectedItem === 'Investment') {
        dispatch(getCategorizedProductsAction(selectedItem) as any)
        dispatch(getAllProductTypesAction() as any)
      }
    } else {
      if (selectedItem === 'Credit') {
        dispatch(getCategorizedProductsAction(selectedItem, productTypeId) as any)
      }
      if (selectedItem === 'Payment') {
        dispatch(getCategorizedProductsAction(selectedItem, productTypeId) as any)
      }
      if (selectedItem === 'Deposit') {
        dispatch(getCategorizedProductsAction(selectedItem, productTypeId) as any)
      }
      if (selectedItem === 'Investment') {
        dispatch(getCategorizedProductsAction(selectedItem, productTypeId) as any)
      }
    }
  }, [selectedItem, activeProductType])

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

  useEffect(() => {
    if (customerId == '' || undefined) {
      navigate(-1)
    }

    dispatch(getCustomerProfileAction(customerId) as any)
  }, [customerId])

  useEffect(() => {
    if (toBeAssignedProductsIds.length > 0) {
      setAssignButtonDisabled(false)
    }
  }, [toBeAssignedProductsIds])

  console.log(customerProfile)

  return (
    <div className='h-screen'>
      <div className='h-[15%] bg-white '>
        <GoBack
          headerText='PRODUCT ASSIGNMENT'
          breadCrumbsList={[
            { text: 'CUSTOMER MANAGEMENT', link: '/' },
            { text: `${customerProfile?.customerType ? convertToUppercase(customerProfile?.customerType) : ''} CUSTOMER `, link: '' },
            { text: `PRODUCT ASSIGNMENT`, link: '' },
          ]}
        />
      </div>
      <div className=' h-[85%] bg-[#E5E5E5] w-full p-[1%] '>
        <div className='  bg-white p-[5%]  h-full   '>
          <div className=' w-full flex flex-col justify-around mt-8  h-full  items-center'>
            <div className='flex gap-12  w-full justify-center items-center'>
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
            <div className=' w-full mt-6  '>
              <h1 className='font-normal  text-[18px]'>Choose Deposit Product</h1>
              <ProductType
                activeProductType={activeProductType}
                setActiveProductType={setActiveProductType}
                data={allProductTypes}
                selectedItem={selectedItem}
                onChange={searchBarHandler}
                searchTerm={searchTerm}
              />
            </div>
            <div className=' w-full mt-6 '>
              <ProductsTable
                selectProductsToBeAssigned={selectProductsToBeAssigned}
                searchTerm={searchTerm}
                activeProductType={activeProductType}
                data={response}
              />
            </div>
            <div className=' w-full  flex justify-center items-center '>
              <Button disabled={assignButtonDisabled} text={'Assign Product'} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAssignment
