import { useState, ChangeEvent, useEffect, memo } from 'react'
import { BulkCreation } from 'Components/BulkCreation'
import { CreationModeType, CustomerType, IdentificationDetailsType } from 'Screens/CustomerCreation'
import { CreationModeEnum } from 'Utilities/enums'
import IdentificationTypeAndNumber from './IdentificationTypeAndNumber'
import FileUploader from './FileUploader'

type Props = {
  creationMode: CreationModeType
  customerType: CustomerType
  setIdentificationDetails: (value: IdentificationDetailsType) => void
  identificationDetails: IdentificationDetailsType
  setLocalUpload: (files: any) => void
}

const CustomerCreationBox = memo(({ creationMode, customerType, setIdentificationDetails, identificationDetails, setLocalUpload }: Props) => {
  return (
    <>
      {creationMode === 'single' ? (
        <div className=' text-[#636363] mt-20 flex '>
          <div className='flex flex-col items-center justify-center flex-1'>
            <IdentificationTypeAndNumber customerType={customerType} setIdentificationDetails={setIdentificationDetails} />
          </div>

          <div className='flex items-center justify-between flex-1 gap-10'>
            <div className='border-r-2 border-[#96989A]  h-[21.25rem]'></div>
            <div className='flex-1'>
              <FileUploader identificationDetails={identificationDetails} setLocalUpload={setLocalUpload} />
            </div>
          </div>
        </div>
      ) : null}
      {creationMode === 'bulk' ? <BulkCreation /> : null}
    </>
  )
})

export default CustomerCreationBox
