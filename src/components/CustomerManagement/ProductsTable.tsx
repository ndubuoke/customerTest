import Spinner from 'Components/Shareables/Spinner'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import React from 'react'
import ProductDetailsRow from './ProductDetailsRow'
import { useState } from 'react'
import SingleProductModal from './SingleProductModal'
import getProductDetail from 'Utilities/getProductDetail'

const ProductsTableHeads = ['', 'PRODUCT NAME', 'PRODUCT CODE', 'CURRENCY', 'PRODUCT DESCRIPTION', '']

type props = {
  data: customersManagementResponseType
  activeProductType: { name: string; id: string }
  searchTerm: string
  selectProductsToBeAssigned: (e) => void
  assignProductHandler:(e)=> void
}

const ProductsTable = ({ data, activeProductType, selectProductsToBeAssigned, searchTerm, assignProductHandler }: props) => {
  const [showProductModal, setShowProductModal] = useState(false)
  const [productId, setProductId] = useState(null)
  const allProducts = data.serverResponse.data?.products.filter((product) => product.product_category  !=='Payment')
    // console.log(allProducts)
  const productFunctionsHandler = (productId) => {
    setProductId(productId)
    setShowProductModal(true)
  }

  return (
    <>
      {showProductModal && (
        <SingleProductModal assignProductHandler={assignProductHandler} productId={productId} setShowProductModal={setShowProductModal} />
      )}
      <div className='overflow-y-scroll    h-[15rem]  '>
        <table className='w-full text-sm text-left  '>
          <thead className='text-xs uppercase     '>
            <tr className='  '>
              {ProductsTableHeads.map((head, index) => (
                <th key={index} className='py-3 relative   text-common-title'>
                  <span className='border-l  px-2 cursor-pointer'>{head}</span>
                </th>
              ))}
            </tr>
          </thead>
          {data.loading ? (
            <tbody className=' '>
              <tr className=' '>
                <td className='  relative' colSpan={5}>
                  <div className='min-h-[18.75rem]   flex items-center justify-center'>
                    <Spinner size='large' />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {!data.loading && data.success ? (
                <tbody className=''>
                  {allProducts
                    .filter((product) => {
                      if (searchTerm === '') {
                        return product
                      } else if (
                        getProductDetail(product, 'name').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                        getProductDetail(product, 'code').toString().toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return product
                      }
                    })
                    .map((product, index) => {
                      return (
                        <ProductDetailsRow
                          selectProductsToBeAssigned={selectProductsToBeAssigned}
                          productFunctionsHandler={productFunctionsHandler}
                          key={index}
                          index={index}
                          product={product}
                        />
                      )
                    })}
                </tbody>
              ) : null}
            </>
          )}
        </table>
      </div>
    </>
  )
}

export default ProductsTable
