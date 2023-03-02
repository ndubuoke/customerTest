import React from 'react'
import getProductDetail from '../../utilities/getProductDetail'
import { Checkbox } from 'Components/Shareables'
import { useState } from 'react'
type props = {
  product: any
  index: number
  productFunctionsHandler: (e) => void
}

const ProductDetailsRow = ({ product, index, productFunctionsHandler }: props) => {
  const [checked, setChecked] = useState(false)
  // console.log(product)
  return (
    <tr key={index} className='bg-background-lightRed border-b text-text-secondary   '>
      <td  className='py-2 px-2 flex justify-center items-center  font-medium    relative '>
        <Checkbox checked={checked} setChecked={setChecked} externalFunctionToDoSomething={() => {}} />
      </td>
      <td className='py-2 px-2 capitalize'>{getProductDetail(product, 'name')}</td>
      <td className='py-2 px-2 capitalize'>{getProductDetail(product, 'code')}</td>
      <td className='py-2 px-2 uppercase'>{getProductDetail(product, 'currency')}</td>
      <td className='py-2 px-2 uppercase'>{getProductDetail(product, 'description')}</td>
      <td className='py-2 px-2 uppercase'>
        <button className='bg-white border p-1 drop-shadow-md' onClick={productFunctionsHandler.bind(null, getProductDetail(product, 'product_id'))}>
          View/Assign
        </button>
      </td>
    </tr>
  )
}

export default ProductDetailsRow
