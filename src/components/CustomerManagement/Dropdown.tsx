import { caret } from 'Assets/svgs'
import { memo, useState } from 'react'
import getProductDetail from '../../utilities/getProductDetail'

type DropdownType = {
  showLists: boolean
  setShowLists: (e) => void

  selectedItemHandler: (e) => void
  selectedItem: string
  dropdownListRef: any
}

const Dropdown = memo(({ showLists, selectedItemHandler, setShowLists, selectedItem, dropdownListRef }: DropdownType) => {
  const productCategoryType = ['All', 'Credit', 'Deposit', 'Investment']

  return (
    <div className=' relative '>
      <button
        onClick={() => {
          setShowLists(() => !showLists)
        }}
        className='flex items-center justify-between w-[300px]  gap-6 py-1 leading-6 border-b border-b-text-secondary'
      >
        <div
          className={`text-text-disabled capitalize`}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {selectedItem}
        </div>
        <span>
          <img src={caret} width={15} height={10} />
        </span>
      </button>
      {showLists && (
        <div
          ref={dropdownListRef}
          className='absolute w-[80%] top-10 overflow-auto  bg-background-paper  flex flex-col z-20 border rounded-md'
          style={{ height: 'max-content' }}
        >
          {productCategoryType?.map((list, index) => {
            return (
              <div key={index} className='hover:bg-[#FFD4D2] cursor-pointer px-3 py-2' onClick={selectedItemHandler.bind(null, list)}>
                {list}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

export default Dropdown
