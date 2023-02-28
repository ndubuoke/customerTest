import Spinner from 'Components/Shareables/Spinner'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import React from 'react'
import ProductTypesDetailsRow from './ProductTypesDetailsRow'

const ProductTypesTableHeads = ['PRODUCT NAME', 'PRODUCT CODE', 'CURRENCY', 'PRODUCT DESCRIPTION']

type props = { data: customersManagementResponseType; activeProductType: string }

const ProductTypesTable = ({ data, activeProductType }: props) => {
  const allProductCategories = data.serverResponse.data
  console.log(allProductCategories)

  return (
    <div className='  mx-4 overflow-auto h-[25rem] overflow-auto '>
      <table className='w-full text-sm text-left table-fixed '>
        <thead className='text-xs uppercase     '>
          <tr className='  '>
            {ProductTypesTableHeads.map((head) => (
              <th key={head} className='py-3 relative   text-common-title'>
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
            {!data.loading && data.success
              ? allProductCategories.map((product) => {
                  return product.product_types.map((type: any) => {
                    if (type.product_type == activeProductType) {
                        return <ProductTypesDetailsRow />
                    }
                  })
                  // console.log(product)
                })
              : null}
          </>
        )}
      </table>
    </div>
  )
}

export default ProductTypesTable
