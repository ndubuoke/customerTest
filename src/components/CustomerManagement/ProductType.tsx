import { Search } from 'Components/Search'
import React from 'react'
import getProductTypeDetail from '../../utilities/getProductDetail'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { customersManagementResponseType } from '../../redux/reducers/CustomerManagement.reducer'

type props = {
  searchTerm: string
  data: customersManagementResponseType
  selectedItem: string
  activeProductType: { name: string; id: string }
  setActiveProductType: (e) => void
  onChange: (e) => void
}

const ProductType = ({ data, selectedItem, setActiveProductType, activeProductType, onChange, searchTerm }: props) => {
 
  const productTypes = data.serverResponse.data
 
  //  console.log(productTypes)
  return (
    <div className='my-4 flex justify-between  '>
      <div className='  flex '>
        {productTypes &&
          productTypes.map((type: any) => {
            if (type?.product_category == selectedItem) {
              return (
                <button
                  className={` ${
                    activeProductType.name === getProductTypeDetail(type, 'product_types')
                      ? ' border-b-4 border-b-primay-main font-bold text-[1.25rem] text-black'
                      : 'text-[1rem] text-text-secondary border-b-2 border-common-title'
                  } mr-4  `}
                  key={type.product_type_id}
                  onClick={() => {
                    setActiveProductType({ name: getProductTypeDetail(type, 'product_types'), id: getProductTypeDetail(type, 'product_type_id') })
                  }}
                >
                  {getProductTypeDetail(type, 'product_types')}
                </button>
              )
            }
          })}
      </div>
      <div className='w-[35%]'>
        <Search onChange={onChange} value={searchTerm} placeholder='Search by product name or code' />
      </div>
    </div>
  )
}

export default ProductType
