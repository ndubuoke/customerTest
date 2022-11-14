import React from 'react'
import useCharacterCount from '../../hooks/use-character-count'

type TextareaType = {}

const Textarea = ({}: TextareaType) => {
  const { characterCount, characterLengthChangeHandler } = useCharacterCount()
  return (
    <div className='  w-full relative '>
      <div>
        <label className='capitalize text-[#333333] text-sm'>Provide justification for deactivation</label>
      </div>
      <textarea
        rows={4}
        maxLength={150}
        onChange={characterLengthChangeHandler}
        className=' bg-transparent   text-text-secondary p-2 rounded  resize-none text-sm   w-full  border-common-title border outline-none '
        placeholder='Reason'
      ></textarea>

      <span className='text-text-nav-link absolute right-[5%] bottom-[8%] text-xs   '>{characterCount}/150</span>
    </div>
  )
}

export default Textarea
