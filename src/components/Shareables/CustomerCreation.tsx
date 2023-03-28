import { useState, ChangeEvent, useEffect, memo } from 'react'
import { BulkCreation } from 'Components/BulkCreation'
import { CreationModeType, CustomerType, IdentificationDetailsType } from 'Screens/CustomerCreation'
import { CreationModeEnum } from 'Utilities/enums'
import IdentificationTypeAndNumber from './IdentificationTypeAndNumber'
import FileUploader from './FileUploader'
import { info } from 'Assets/svgs'

type Props = {
  creationMode: CreationModeType
  customerType: CustomerType
  setIdentificationDetails: (value: IdentificationDetailsType) => void
  identificationDetails: IdentificationDetailsType
  setLocalUpload: (files: any) => void
  setFileUploaded: any
}

const CustomerCreationBox = memo(
  ({ creationMode, customerType, setIdentificationDetails, identificationDetails, setLocalUpload, setFileUploaded }: Props) => {
    return (
      <>
        {creationMode === 'single' ? (
          <>
            <div
              className='flex justify-end text-sm gap-3 '
              style={{
                maxWidth: '42%',
                width: '42%',
                marginTop: '4rem',
                marginBottom: '2rem',
                color: '#8F8F8F',
              }}
            >
              <img src={info} />
              Provide some customer's basic information and upload relevant <br /> documents to help you fast-track the customer creation process.
            </div>
            <div className=' text-[#636363]  flex '>
              <div className='flex flex-col items-center justify-start flex-1 mt-16'>
                <IdentificationTypeAndNumber
                  setFileUploaded={setFileUploaded}
                  customerType={customerType}
                  setIdentificationDetails={setIdentificationDetails}
                />
              </div>

              <div className='flex items-center justify-between flex-1 gap-10'>
                <div className='border-r border-[#96989A]  h-[21.25rem] ' style={{ maxHeight: '250px' }}></div>
                <div className='flex-1'>
                  <FileUploader setFileUploaded={setFileUploaded} identificationDetails={identificationDetails} setLocalUpload={setLocalUpload} />
                </div>
              </div>
            </div>
          </>
        ) : null}
        {creationMode === 'bulk' ? <BulkCreation /> : null}
      </>
    )
  }
)

export default CustomerCreationBox
