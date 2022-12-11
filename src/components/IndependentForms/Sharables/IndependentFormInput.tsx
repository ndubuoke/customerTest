import React, { useState } from 'react'

type Props = {
  characterMaxLength: number
}
const [theValue, setTheValue] = useState<string>('30')
const IndependentFormInput = (characterMaxLength, props: Props) => {
  return (
    <div>
      <div className='flex flex-col border-b '>
        <input maxLength={characterMaxLength} value={theValue} />
        {characterMaxLength && (
          <span className='text-[10px] text-gray-400 '>
            {`${theValue.length}`}/{`${characterMaxLength}`}
          </span>
        )}
      </div>
    </div>
  )
}

export default IndependentFormInput
