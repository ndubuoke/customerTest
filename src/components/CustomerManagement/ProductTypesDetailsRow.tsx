import React from 'react'
import getProductTypeDetail from '../../utilities/getProductTypeDetail';
type props = {
  product: any
}

const ProductTypesDetailsRow = ({ product }: props) => {
  console.log(product)
  return (
    <tr key={product?.created_by_id} className='bg-background-lightRed border-b text-text-secondary   '>
      <td scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
        ''
      </td>
      <td className='py-2 px-2'>{getProductTypeDetail(product,'name')}</td>
    </tr>
  )
}

export default ProductTypesDetailsRow
