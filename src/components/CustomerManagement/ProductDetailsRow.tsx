import React from 'react'
import getProductDetail from '../../utilities/getProductDetail'
type props = {
  product: any
  index:number
}

const ProductDetailsRow = ({ product, index }: props) => {
  // console.log(product)
  return (
    <tr key={index} className='bg-background-lightRed border-b text-text-secondary   '>
      <td scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
        ''
      </td>
      <td className='py-2 px-2 capitalize'>{getProductDetail(product, 'name')}</td>
      <td className='py-2 px-2 capitalize'>{getProductDetail(product, 'code')}</td>
      <td className='py-2 px-2 uppercase'>{getProductDetail(product, 'currency')}</td>
      <td className='py-2 px-2 uppercase'>{getProductDetail(product, 'description')}</td>
      <td className='py-2 px-2 uppercase'>
        <button className='bg-white border p-1 drop-shadow-md'>View/Assign</button>
      </td>
    </tr>
  )
}

export default ProductDetailsRow
