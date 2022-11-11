import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { BubbleLoader, bulkTemplate, ExclaimateIcon, GreenCheck } from 'Assets/svgs'
import { Dropzone } from '../Dropzone'
import readXlsxFile from 'read-excel-file'
import uploadTemplate from '../../../assets/files/bulk_customer_upload_template.xlsx'
import Button from 'Components/Shareables/Button'
import { BulkTable } from '../BulkTable'

export const BulkCreation = () => {
  const [uploadedFile, setUploadedFile] = useState([])
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [failedValidation, setFailedValidation] = useState(0)
  const [successfulValidation, setSuccessfulValidation] = useState(0)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [searchString, setSearchString] = useState(null)
  const [records, setRecords] = useState([])

  const bulkUploadTemplateRef = useRef(null)

  const accept = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ['.xls', '.xlsx']
  }

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length) {

      const rejectedFile = fileRejections[0];

      setUploadedFileName(rejectedFile?.file['name'])
      setFileUploadError(true)
      setFileUploaded(true)
      return
    }

    const acceptedFile = acceptedFiles[0]
    setUploadedFileName(acceptedFile['name'])
    setFileUploadError(false)
    setFileUploaded(true)

    const file = acceptedFiles[0];

    (async () => {
      const rows = await readXlsxFile(file)

      const details = rows.slice(1)
      const customerValidation = []
      details.forEach((det) => {
        customerValidation.push({
          surname: det[0],
          firstName: det[1],
          otherNames: det[2],
          gender: det[3],
          dob: det[4],
          nationality: det[5],
          soo: det[6],
          idType: det[7],
          id: det[8],
          residentialAddress: det[9],
          country: det[10],
          state: det[11],
          city_town: det[12],
          lga: det[13],
          mobileNumber: det[14],
          status: Number((det[8]).toString()[0]) !== 8 ? 0 : 1,
          statusDescription: Number((det[8]).toString()[0]) !== 8 ? `Provided ID not Found in ${det[7]} Database` : `n/a`,
        })
      })
      setUploadedFile(customerValidation)
      setRecords(customerValidation)

      setFailedValidation(customerValidation.filter((customer) => customer.status === 0).filter(Boolean).length)
      setSuccessfulValidation(customerValidation.filter((customer) => customer.status === 1).filter(Boolean).length)
    })();

  }, [fileUploaded, fileUploadError, uploadedFileName, uploadedFile, successfulValidation, failedValidation])

  const onDeleteUploadedFile = useCallback(() => {

    setFileUploadError(false)
    setFileUploaded(false)
    setUploadedFileName('')
    setUploadedFile(() => [])
  }, [fileUploaded, fileUploadError, uploadedFileName, uploadedFile])

  const onDeleteCustomer = useCallback((index) => {
    const temp = uploadedFile
    temp.splice(index, 1)
    setUploadedFile(() => [...temp])
    setFailedValidation(temp.filter((customer) => customer.status === 0).filter(Boolean).length)
    setSuccessfulValidation(temp.filter((customer) => customer.status === 1).filter(Boolean).length)
    if (searchString) {
      setSearchString(null)
    }
  }, [uploadedFile, successfulValidation, failedValidation, searchString])

  const onDownloadTemplate = useCallback(() => {
    const ext = "xlsx";

    // const link = document.createElement("a");
    // link.href = '';
    bulkUploadTemplateRef.current.download = `bulk_customer_upload_template.${ext}`;
    bulkUploadTemplateRef.current.click();
  }, [])

  const onSearchStringChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearchString(null)
    } else {
      setSearchString(e.target.value)
    }
  }, [searchString])


  // useEffect(() => {
  // }, [])

  useEffect(() => {
    if (searchString !== null) {
      const invalidSearch = searchString.match(/[\`\~\!\@\#\$\%\^\&*\(\)\_\-\+\=\[\]\{\}\/\\\.\,\<\>\'\;\:\"]/g)
      console.log(invalidSearch, "invalidSearch")
      if (invalidSearch !== null) {
        return
      }
      console.log(searchString, "searchString")
      const search = new RegExp(searchString, 'g')
      const searchedRecords = uploadedFile.map((record) => {
        if (search.test(record?.firstName.toLowerCase()) || search.test(record?.surname.toLowerCase()) || search.test(record?.otherNames.toLowerCase())) {
          return record
        }
      }).filter(Boolean)
      setRecords(() => [...searchedRecords])
    } else {
      setRecords(() => [...uploadedFile])
    }
  }, [searchString])


  // console.log(uploadedFile)
  return (
    <>
      <div className={`max-h-607 overflow-auto w-full`}>
        <div className='flex justify-center gap-16 text-[#636363] mt-3'>
          <div className='flex flex-col justify-center w-1/2'>
            <div className='flex items-center mb-10 self-end mr-[48px]'>
              <span className={`text-right w-[200px] leadiing-[0px]`}>
                Upload Bulk Customer
                Creation File
              </span>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>

          </div>
          {/* <div className='border-r border-[#8F8F8F]'></div> */}
          <div className={`w-1/2`}  >
            <div className='flex flex-col py-20 px-0 gap-y-5 w-fit'>
              <Dropzone
                accept={accept}
                onDrop={onDrop}
                error={fileUploadError}
                fileUploaded={fileUploaded}
                fileName={uploadedFileName}
                onDeleteUpload={onDeleteUploadedFile}
              />
              {fileUploaded ?
                null :
                <button onClick={onDownloadTemplate} className={`self-end border-2 px-2 py-1 rounded`}>
                  <img src={bulkTemplate} alt={''} />
                  <a ref={bulkUploadTemplateRef} href={uploadTemplate} hidden></a>
                </button>
              }
            </div>
            {fileUploaded && !fileUploadError ?

              <div className={`flex gap-x-2 mb-3`}>
                <GreenCheck />
                <div>Document Format Verified</div>
              </div>
              : null
            }
            {uploadedFile?.length ?

              <div className={`flex gap-x-2 mb-3`}>
                {failedValidation > 0 ? <ExclaimateIcon /> : <GreenCheck />}
                <div>{successfulValidation} / {uploadedFile?.length} Indvidual Identification Validated</div>
              </div>
              : null
            }
            {uploadedFile?.length ?

              <div className={`flex gap-x-2 mb-3`}>
                {failedValidation > 0 ? <ExclaimateIcon /> : <GreenCheck />}
                <div>{successfulValidation} / {uploadedFile?.length} Customer IDs Created</div>
              </div>
              : null
            }

            {/* <img className={`animate-spin bg-transparent rounded-full`} src={BubbleLoader} alt="BubbleLoader" /> */}

          </div>
        </div>

        {uploadedFile?.length ? <BulkTable
          uploadedFile={uploadedFile}
          failedValidation={failedValidation}
          successfulValidation={successfulValidation}
          onDeleteCustomer={onDeleteCustomer}
          hasControls={true}
          onSearchStringChange={onSearchStringChange}
          records={records}
          searchString={searchString}
        />
          : null
        }
        <div className='flex  justify-center relative  gap-1'>
          <Button
            text='Proceed'
            disabled={!uploadedFile.length}
            onClick={undefined}
          />
        </div>
      </div>
    </>
  )
}