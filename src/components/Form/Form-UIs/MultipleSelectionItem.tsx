import React from 'react'

type Props = {}

const MultipleSelectionItem = (props: Props) => {
  return (
    <div className='flex flex-col gap-1 mt-3'>
      <label className='text-sm' htmlFor='hhh'>
        Test 1
      </label>
      <div className='flex items-end justify-between py-2'>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            id='hhh'
            className='cursor-pointer w-4 h-4 text-primay-main bg-gray-100 rounded border-gray-300 focus:ring-primay-main '
          />
          <div className='w-11 h-6 border-primay-main  '></div>
        </label>
      </div>
    </div>
  )
}

export default MultipleSelectionItem
