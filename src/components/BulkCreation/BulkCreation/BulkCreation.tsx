import { useCallback, useRef, useState } from 'react'
import { BubbleLoader, bulkTemplate, DownloadIcon, GreenCheck } from 'Assets/svgs'
import { Dropzone } from '../Dropzone'
import readXlsxFile from 'read-excel-file'
import uploadTemplate from '../../../assets/files/bulk_customer_upload_template.xlsx'
// /assets/files/bulk_customer_upload_template.xlsx'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { bulkCreationColumns } from 'Utilities/columns'
import { EditIcon } from 'Assets/svgs/EditIcon'
import { RemoveIcon } from 'Assets/svgs/RemoveIcon'
import { Search } from 'Components/Search'

export const BulkCreation = () => {
  const [uploadedFile, setUploadedFile] = useState([])
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

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
      details.forEach((det) => {
        setUploadedFile((prev) => [...prev, {
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
          statusDescription: 'n/a',
        }])
      })
    })();

  }, [fileUploaded, fileUploadError, uploadedFileName, uploadedFile])

  const onDeleteUploadedFile = useCallback((e) => {
    e.stopPropagation()

    setFileUploadError(false)
    setFileUploaded(false)
    setUploadedFileName('')
    setUploadedFile(() => [])
  }, [fileUploaded, fileUploadError, uploadedFileName, uploadedFile])

  const onDownloadTemplate = useCallback(() => {
    const ext = "xlsx";

    // const link = document.createElement("a");
    // link.href = '';
    bulkUploadTemplateRef.current.download = `bulk_customer_upload_template.${ext}`;
    bulkUploadTemplateRef.current.click();
  }, [])

  // console.log(uploadedFile)
  return (
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
              <GreenCheck />
              <div>{`${uploadedFile?.length}/${uploadedFile?.length}`} Indvidual Identification Validated</div>
            </div>
            : null
          }
          {uploadedFile?.length ?

            <div className={`flex gap-x-2 mb-3`}>
              <GreenCheck />
              <div>{`${uploadedFile?.length}/${uploadedFile?.length}`} Customer IDs Created</div>
            </div>
            : null
          }

          {/* <img className={`animate-spin bg-transparent rounded-full`} src={BubbleLoader} alt="BubbleLoader" /> */}

        </div>
      </div>
      {uploadedFile.length ?
        <div className={`w-full p-20 font-[Inter]`}>
          <div className={`w-full flex justify-between items-end h-[150px]`}>
            <div className={`flex flex-col gap-y-8`}>
              <div>Bulk Customer Profile Validation Summary</div>
              <div className={`flex gap-x-2 font-[Inter] text-[12px] font-semibold leading-4 w-fit`}>
                <div
                  className={`text-[#636363] flex justify-between items-center gap-x-2 w-fit px-2`}>
                  All
                  <div
                    className={`bg-[#636363] text-white h-[20px] w-[20px] rounded-full flex justify-center items-center`}
                  >
                    {uploadedFile?.length}
                  </div>
                </div>

                <div
                  className={`text-[#2FB755] flex justify-between items-center gap-x-2 w-fit px-2`}
                >
                  SUCCESSFUL
                  <div
                    className={`bg-[#2FB755] text-white h-[20px] w-[20px] rounded-full flex justify-center items-center`}
                  >
                    {uploadedFile?.length}
                  </div>
                </div>

                <div
                  className={`text-[#CF2A2A] flex justify-between items-center gap-x-2 w-fit px-2`}
                >
                  FAILED
                  <div
                    className={`bg-[#CF2A2A] text-white h-[20px] w-[20px] rounded-full flex justify-center items-center`}
                  >
                    {uploadedFile?.length / uploadedFile?.length}
                  </div>
                </div>

              </div>
            </div>
            <div>

            </div>
            {/* search and download */}
            <div className={`flex w-fit border-r-2 gap-x-2 justify-between`}>
              <div className={`w-[150px]`}>
                <Search />
              </div>
              <div className={`w-[150px]`}>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='w-full download-table-xls-button rounded'
                  table='table-to-xlsx'
                  filename='Bulk Customer Validation Profile'
                  sheet='Bulk Customer Validation Profile'
                  buttonText={<div className={`flex items-center gap-x-2`}><DownloadIcon />Download</div>}
                />
              </div>
            </div>
          </div>
          <div className="shadow overflow-x-auto border-b border-gray-200 mt-10">
            <table id='table-to-xlsx' className={`min-w-full divide-y divide-x divide-gray-200`}>
              <thead className={`bg-gray-50`}>
                <tr className={``}>
                  {bulkCreationColumns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="h-[60px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      <div className={`flex`}>
                        {column.header}
                        <span>
                          {column?.isSorted
                            ? column?.isSortedDesc
                              ? "▼"
                              : "▲"
                            : ""}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200`}>
                {uploadedFile?.length ? uploadedFile?.map((row, i) => {
                  return (
                    <tr key={i} className={`bg-[#db353905] h-[60px]`}>
                      {bulkCreationColumns.map((cell, index) => {
                        if (cell.accessor == "") {
                          return (
                            <td
                              key={index}
                              className={`h-[60px] px-6 py-4 whitespace-nowrap flex items-center justify-between gap-x-1`}
                            >
                              {row.status === 0 ?
                                <button
                                  onClick={() => { }}
                                  // 0px 2px 8px rgba(0, 0, 0, 0.25);
                                  className={`w-[30px] h-[30px] rounded bg-white shadow-lg flex justify-center items-center`}
                                >
                                  <EditIcon />
                                </button>
                                : <button></button>
                              }

                              <button
                                // onClick={() => onUserDelete(row?.id)}
                                className={`w-[30px] h-[30px] rounded bg-white shadow-lg flex justify-center items-center`}
                              >
                                <RemoveIcon />
                              </button>

                            </td>
                          );
                        }
                        if (cell.mapping) {
                          return (
                            <td
                              key={index}
                              className="h-[60px] px-6 py-4 whitespace-nowrap"
                            >
                              {cell.mapping[row[cell.accessor]]}
                            </td>
                          );
                        }
                        if (cell.accessor === 'serial') {
                          return (
                            <td
                              key={index}
                              className=" h-[60px] px-6 py-4 whitespace-nowrap"
                            >
                              {i + 1}
                            </td>
                          );
                        }
                        return (
                          <td key={index} className=" h-[60px] px-6 py-4 whitespace-nowrap">
                            {row[cell.accessor]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
                  : null
                }
              </tbody>

            </table>
          </div>
        </div> : null}
    </div>
  )
}