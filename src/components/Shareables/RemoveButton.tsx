import React, { memo } from 'react'
import { times } from '../../assets/svgs'

type RemoveButtonProps = {
  showRemoveButton: Boolean
  onClick: (item: any) => any
}
const RemoveButton = memo(({ showRemoveButton, onClick }: RemoveButtonProps) => {
  return (
    <>
      {showRemoveButton && (
        <button className='absolute -right-1 top-0 z-10' onClick={onClick}>
          <img src={times} alt='' width={25} height={25} />
        </button>
      )}
    </>
  )
})

export default RemoveButton
