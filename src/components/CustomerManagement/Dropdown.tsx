import { caret } from 'Assets/svgs'
import { memo } from 'react'

type DropdownType = {
  showLists: boolean
  data: []
  selectedItemHandler: (e) => void
}

const Dropdown = memo(({ showLists, data, selectedItemHandler }: DropdownType) => {
  return (
    <div className='  '>
      <button className='flex items-center justify-between w-[300px]  gap-6 py-1 leading-6 border-b border-b-text-secondary' title={'fuck'}>
        <div
          className={`text-text-disabled capitalize`}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {'enter a placeholder'}
        </div>
        <span>
          <img src={caret} width={15} height={10} />
        </span>
      </button>
      {showLists && (
        <div className='absolute w-full top-0   bg-background-paper  flex flex-col z-20 border rounded-md'>
          {data?.map((list, index) => {
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
