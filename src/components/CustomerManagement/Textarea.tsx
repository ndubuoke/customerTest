import React from 'react'
import {useCharacterCount} from '../../hooks/use-character-count'

type TextareaType = {
  rows?: number
  disabled?: boolean
  value?: string
  label: string
  characterLengthChangeHandler: (e) => void
  character: string
  characterCount:number
}

const Textarea = ({ rows, disabled = false, value, label, characterLengthChangeHandler, character, characterCount }: TextareaType) => {
  return (
    <div className='  w-full relative '>
      <div>
        <label className='capitalize text-[#333333] text-sm'>{label}</label>
      </div>
      <textarea
        rows={rows ? rows : 4}
        maxLength={150}
        onChange={characterLengthChangeHandler}
        className=' bg-transparent   text-text-secondary p-2 rounded  resize-none text-sm   w-full  border-common-title border outline-none '
        placeholder='Reason'
        disabled={disabled}
        value={character ? character : value}
      ></textarea>

      <span className='text-text-nav-link absolute right-[5%] bottom-[8%] text-xs   '>{characterCount}/150</span>
    </div>
  )
}

export default Textarea
