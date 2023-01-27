import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BubbleLoader, bulkTemplate, ExclaimateIcon, GreenCheck } from 'Assets/svgs'
import { Dropzone } from '../Dropzone'
import readXlsxFile from 'read-excel-file'
import uploadTemplate from '../../../assets/files/bulk_customer_upload_template.xlsx'
import Button from 'Components/Shareables/Button'
import { BulkTable } from '../BulkTable'
import { AppRoutes } from 'Routes/AppRoutes'
import { bulkCreationColumns } from 'Utilities/columns'
import { setBulkCreationSummary } from 'Redux/actions/BulkCreation'
import { setFileUploaded, updateValidatedCustomers, validateCustomers } from 'Redux/actions/BulkCreation/BulkCreation'
import { ReducersType } from 'Redux/store'
import { BulkCustomerValidationProfileTypes } from 'Redux/reducers/BulkCreation'
import { BulkIndividualModifyRecordModal } from 'Components/BulkIndividualModifyRecordModal'

export const BulkCreation = () => {
  const dispatch = useDispatch() as any

  // const [fileUploaded, setFileUploaded] = useState(false)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [failedValidation, setFailedValidation] = useState(0)
  const [successfulValidation, setSuccessfulValidation] = useState(0)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [searchString, setSearchString] = useState(null)
  const [records, setRecords] = useState([])

  const bulkUploadTemplateRef = useRef(null)
  const { bulkCustomersValidatedProfile, fileUploaded, error, message, success, loading } = useSelector<ReducersType>(
    (state) => state.bulkCustomerValidationProfile
  ) as BulkCustomerValidationProfileTypes

  const navigate = useNavigate()

  const accept = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xls', '.xlsx'],
  }

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length) {
        const rejectedFile = fileRejections[0]

        setUploadedFileName(rejectedFile?.file['name'])
        setFileUploadError(true)
        dispatch(setFileUploaded(true))
        return
      }

      const acceptedFile = acceptedFiles[0]
      setUploadedFileName(acceptedFile['name'])
      setFileUploadError(false)
      dispatch(setFileUploaded(true))

      const file = acceptedFiles[0]
      const formData = new FormData()

      const fileReader = new FileReader()
      fileReader.onload = (() => {
        return (e) => { }
      })()
      fileReader.readAsDataURL(file)
      formData.append('customers', file)

      dispatch(validateCustomers(formData))
    },
    [fileUploaded, fileUploadError, uploadedFileName, successfulValidation, failedValidation]
  )

  const onDeleteUploadedFile = useCallback(() => {
    setFileUploadError(false)
    dispatch(setFileUploaded(false))
    setUploadedFileName('')
    // setUploadedFile(() => [])
    dispatch(updateValidatedCustomers([]))
  }, [fileUploaded, fileUploadError, uploadedFileName, bulkCustomersValidatedProfile])

  const onDeleteCustomer = useCallback(
    (index) => {
      const temp = bulkCustomersValidatedProfile
      temp.splice(index, 1)
      // setUploadedFile(() => [...temp])
      dispatch(updateValidatedCustomers(temp))
      setRecords(temp)
      setFailedValidation(temp.filter((customer) => customer.status === 0).filter(Boolean).length)
      setSuccessfulValidation(temp.filter((customer) => customer.status === 1).filter(Boolean).length)
      if (searchString) {
        setSearchString(null)
      }
    },
    [successfulValidation, failedValidation, searchString, bulkCustomersValidatedProfile]
  )

  const onCheckout = useCallback(() => {
    const validatedProfilesOnly = bulkCustomersValidatedProfile
      .map((profile) => {
        if (Number(profile.status) === 1) {
          return profile
        }
      })
      .filter(Boolean)
    dispatch(setBulkCreationSummary(validatedProfilesOnly))
    navigate(AppRoutes.bulkCustomerCreationMakerCheckerScreen)
  }, [successfulValidation, failedValidation, searchString, bulkCustomersValidatedProfile])

  const onDownloadTemplate = useCallback(() => {
    const ext = 'xlsx'

    // const link = document.createElement("a");
    // link.href = '';
    bulkUploadTemplateRef.current.download = `bulk_customer_upload_template.${ext}`
    bulkUploadTemplateRef.current.click()
  }, [])

  const onSearchStringChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setSearchString(null)
      } else {
        setSearchString(e.target.value)
      }
    },
    [searchString]
  )

  useEffect(() => {
    console.log(bulkCustomersValidatedProfile)
    if (bulkCustomersValidatedProfile.length) {
      setRecords(bulkCustomersValidatedProfile)

      setFailedValidation(bulkCustomersValidatedProfile.filter((customer) => Number(customer.status) === 0).filter(Boolean).length)
      setSuccessfulValidation(bulkCustomersValidatedProfile.filter((customer) => Number(customer.status) === 1).filter(Boolean).length)
    }
  }, [bulkCustomersValidatedProfile])

  useEffect(() => {
    if (searchString !== null) {
      const invalidSearch = searchString.match(/[\`\~\!\@\#\$\%\^\&*\(\)\_\-\+\=\[\]\{\}\/\\\.\,\<\>\'\;\:\"]/g)
      console.log(invalidSearch, 'invalidSearch')
      if (invalidSearch !== null) {
        return
      }
      console.log(searchString, 'searchString')
      const search = new RegExp(searchString, 'g')
      const searchedRecords = bulkCustomersValidatedProfile
        .map((record) => {
          if (
            search.test(record?.firstName.toLowerCase()) ||
            search.test(record?.surname.toLowerCase()) ||
            search.test(record?.otherNames.toLowerCase())
          ) {
            return record
          }
        })
        .filter(Boolean)
      setRecords(() => [...searchedRecords])
    } else {
      setRecords(() => [...bulkCustomersValidatedProfile])
    }
  }, [searchString])

  // console.log(uploadedFile)
  return (
    <>
      <div className={`max-h-607 overflow-auto w-full`}>
        <div className='flex justify-center gap-16 text-[#636363] mt-3'>
          <div className='flex flex-col justify-center w-1/2'>
            <div className='flex items-center mb-10 self-end mr-[3rem]'>
              <span className={`text-right w-[12.5rem] leadiing-[0rem]`}>Upload Bulk Customer Creation File</span>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
          </div>

          {/* <div className='border-r border-[#8F8F8F]'></div> */}
          <div className={`w-1/2`}>
            <div className='flex flex-col py-20 px-0 gap-y-5 w-fit'>
              <Dropzone
                accept={accept}
                onDrop={onDrop}
                error={fileUploadError}
                fileUploaded={fileUploaded}
                fileName={uploadedFileName}
                onDeleteUpload={onDeleteUploadedFile}
              />
              {fileUploaded ? null : (
                <button onClick={onDownloadTemplate} className={`self-end border-2 px-2 py-1 rounded`}>
                  <img src={bulkTemplate} alt={''} />
                  <a ref={bulkUploadTemplateRef} href={uploadTemplate} hidden></a>
                </button>
              )}
            </div>

            {fileUploaded && !fileUploadError ? (
              <div className={`flex gap-x-2 mb-3`}>
                <GreenCheck />
                <div>Document Format Verified</div>
              </div>
            ) : null}
            {loading ? (
              <div className={`flex gap-x-2 mb-3`}>
                <img className={`animate-spin`} src={BubbleLoader} alt={``} />
                <div>Validating Means of Identification</div>
              </div>
            ) : null}
            {bulkCustomersValidatedProfile?.length ? (
              <div className={`flex gap-x-2 mb-3`}>
                {failedValidation > 0 ? <ExclaimateIcon /> : <GreenCheck />}
                <div>
                  {successfulValidation} / {bulkCustomersValidatedProfile?.length} Indvidual Identification Validated
                </div>
              </div>
            ) : null}
            {bulkCustomersValidatedProfile?.length ? (
              <div className={`flex gap-x-2 mb-3`}>
                {failedValidation > 0 ? <ExclaimateIcon /> : <GreenCheck />}
                <div>
                  {successfulValidation} / {bulkCustomersValidatedProfile?.length} Customer IDs Created
                </div>
              </div>
            ) : null}

            {/* <img className={`animate-spin bg-transparent rounded-full`} src={BubbleLoader} alt="BubbleLoader" /> */}
          </div>
        </div>
        {/* </div> */}

        {bulkCustomersValidatedProfile?.length ? (
          <BulkTable
            uploadedFile={bulkCustomersValidatedProfile}
            failedValidation={failedValidation}
            successfulValidation={successfulValidation}
            onDeleteCustomer={onDeleteCustomer}
            hasControls={true}
            onSearchStringChange={onSearchStringChange}
            records={records}
            searchString={searchString}
            tableTitle={`Bulk Customer Profile Validation Summary`}
            bulkTableColumns={bulkCreationColumns}
          />
        ) : null}
        <div className={`flex  justify-center relative  gap-1 ${!bulkCustomersValidatedProfile.length ? 'mt-52' : ''}`}>
          <Button text='Proceed' disabled={!bulkCustomersValidatedProfile.length} onClick={onCheckout} />
        </div>
      </div>
      <BulkIndividualModifyRecordModal isOpen={false} modalCloseClick={undefined} loading={false} />
    </>
  )
}
