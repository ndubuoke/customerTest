import React, { useState } from 'react'

type Props = {
  handleMultipleSelectedDropdownItem: (selected: string, action: 'remove' | 'add') => void
  selected: string
}

const MultipleSelectionItem = ({ handleMultipleSelectedDropdownItem, selected }: Props) => {
  return (
    <div className='flex gap-2 py-2 px-3 items-center text-[#636363] hover:bg-slate-100'>
      <div className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          id='hhh'
          className={`cursor-pointer accent-primay-main w-4 h-4 text-primay-main bg-gray-100 rounded border-gray-300 focus:ring-primay-main`}
          onChange={(e) => {
            let isChecked = e.target.checked

            if (isChecked) {
              handleMultipleSelectedDropdownItem(selected, 'add')
            } else {
              handleMultipleSelectedDropdownItem(selected, 'remove')
            }
          }}
        />
      </div>
      <label className='text-sm' htmlFor='hhh'>
        {selected}
      </label>
    </div>
  )
}

export default MultipleSelectionItem