import { caret } from 'Assets/svgs'
import { FormControlType } from 'Components/types/FormControl.types'
import { memo } from 'react'

type DropdownType = {}

const Dropdown = memo(({}: DropdownType) => {
  return (
    <div className='w-full p-1 '>
      <div className='w-full '>
        <button className='flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-text-secondary' title={'fuck'}>
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
      </div>
    </div>
  )
})

export default Dropdown
