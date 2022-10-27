import React from 'react'
import { times } from '../../assets/svgs'

type RemoveButtonProps = {
  showRemoveButton: Boolean
  onClick: (e: any) => any
}
const RemoveButton = ({ showRemoveButton, onClick }: RemoveButtonProps) => {
  return (
    <>
      {showRemoveButton && (
        <button className='absolute -right-1 top-0 z-10' onClick={onClick}>
          <img src={times} alt='' width={17} height={17} />
        </button>
      )}
    </>
  )
}

export default RemoveButton
