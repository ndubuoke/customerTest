import { useState, ChangeEvent, useEffect } from 'react'
import { BulkCreation } from 'Components/BulkCreation'
import { CreationModeType, CustomerType } from 'Screens/CustomerCreation'
import { CreationModeEnum } from 'Utilities/enums'
import IdentificationTypeAndNumber from './IdentificationTypeAndNumber'
import FileUploader from './FileUploader'

type Props = {
  creationMode: CreationModeType
  customerType: CustomerType
}

const CustomerCreationBox = ({ creationMode, customerType }: Props) => {
  return (
    <>
      {creationMode === 'single' ? (
        <div className=' text-[#636363] mt-20 flex '>
          <div className='flex flex-col justify-center items-center flex-1'>
            <IdentificationTypeAndNumber customerType={customerType} />
          </div>

          <div className='flex-1 flex gap-10 justify-between items-center'>
            <div className='border-r-2 border-[#96989A]  h-[340px]'></div>
            <div className='flex-1'>
              <FileUploader />
            </div>
          </div>
        </div>
      ) : null}
      {creationMode === 'bulk' ? <BulkCreation /> : null}
    </>
  )
}

export default CustomerCreationBox
