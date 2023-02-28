import Spinner from 'Components/Shareables/Spinner'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import React from 'react'
import ProductDetailsRow from './ProductDetailsRow'

const ProductsTableHeads = ['', 'PRODUCT NAME', 'PRODUCT CODE', 'CURRENCY', 'PRODUCT DESCRIPTION','']

type props = { data: customersManagementResponseType; activeProductType: string }

const ProductsTable = ({ data, activeProductType }: props) => {
  const allProducts = data.serverResponse.data?.products
  console.log(allProducts)

  return (
    <div className='  mx-4  h-[25rem] overflow-auto  '>
      <table className='w-full text-sm text-left   '>
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
                {allProducts.map((product, index) => {
                  // if (type.product_type == activeProductType) {
                  //     return <ProductTypesDetailsRow />
                  // }

                  return <ProductDetailsRow key={index} index={index} product={product} />
                })}
              </tbody>
            ) : null}
          </>
        )}
      </table>
    </div>
  )
}

export default ProductsTable
