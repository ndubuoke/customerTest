import { Search } from 'Components/Search'
import React from 'react'
import getProductTypeDetail from '../../utilities/getProductDetail'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar';

type props = {
   searchTerm: string
  data: []
  selectedItem: string
  activeProductType: string
  setActiveProductType: (e) => void
  onChange: (e) => void
}

const ProductType = ({ data, selectedItem, setActiveProductType, activeProductType, onChange, searchTerm }: props) => {
  // const [activeProductType, setActiveProductType] = useState('')

  useEffect(() => {}, [activeProductType])
  // console.log(activeProductType)
  return (
    <div className='my-4 flex justify-between'>
      <div>
        {/* {data &&
          data.map((type: any) => {
            if (type?.product_category == selectedItem) {
              return type?.product_types.map((productType) => {
                return (
                  <button
                    className={` ${
                      activeProductType === getProductTypeDetail(productType, 'product_types')
                        ? ' border-b-4 border-b-primay-main font-bold text-[1.25rem] text-black'
                        : 'text-[1rem] text-text-secondary border-b-2 border-common-title'
                    } mr-4 `}
                    key={productType.product_type_id}
                    onClick={() => {
                      setActiveProductType(getProductTypeDetail(productType, 'product_types'))
                    }}
                  >
                    {getProductTypeDetail(productType, 'product_types')}
                  </button>
                )
              })
            }
          })} */}
      </div>
      <div className='w-[35%]'>
        <Search onChange={onChange} value={searchTerm} placeholder='Search by product name or code' />
      </div>
    </div>
  )
}

export default ProductType
