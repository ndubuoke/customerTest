import React from 'react'

const ProductTypesTableHeads = ["PRODUCT NAME","PRODUCT CODE","CURRENCY", "PRODUCT DESCRIPTION"]

const ProductTypesTable = () => {
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
      </table>
    </div>
  )
}

export default ProductTypesTable
