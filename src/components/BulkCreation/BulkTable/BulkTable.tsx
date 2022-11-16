import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { DownloadIcon, ExclaimateIcon } from 'Assets/svgs'

// /assets/files/bulk_customer_upload_template.xlsx'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { EditIcon } from 'Assets/svgs/EditIcon'
import { RemoveIcon } from 'Assets/svgs/RemoveIcon'
import { Search } from 'Components/Search'

interface Props {
  uploadedFile: any[]
  failedValidation: number
  successfulValidation: number
  onDeleteCustomer: (e: any) => void,
  hasControls: boolean,
  records: any[],
  onSearchStringChange: (e: ChangeEvent) => void
  searchString: string
  tableTitle: string
  bulkTableColumns: any[]
}

export const BulkTable = ({ uploadedFile, tableTitle, failedValidation, successfulValidation, hasControls, records, searchString, bulkTableColumns, onDeleteCustomer, onSearchStringChange }: Props) => {


  return (
    <>
      {/* {records?.length ? */}
      <div className={`w-full p-20 font-[Inter]`}>
        <div className={`w-full flex justify-between items-end h-[150px]`}>
          <div className={`flex flex-col gap-y-8`}>
            <div>{tableTitle}</div>
            {hasControls ? <div className={`flex gap-x-2 font-[Inter] text-[12px] font-semibold leading-4 w-fit`}>
              <div
                className={`text-[#636363] flex justify-between items-center gap-x-2 w-fit px-2`}>
                All
                <div
                  className={`bg-[#636363] text-white text-center py-2 leading-[150%] h-[20px] w-[20px] rounded-full flex justify-center items-center`}
                >
                  {uploadedFile?.length}
                </div>
              </div>

              <div
                className={`text-[#2FB755] flex justify-between items-center gap-x-2 w-fit px-2`}
              >
                SUCCESSFUL
                <div
                  className={`bg-[#2FB755] text-white text-center py-2 leading-[150%] h-[20px] w-[20px] rounded-full flex justify-center items-center`}
                >
                  {successfulValidation}
                </div>
              </div>

              <div
                className={`text-[#CF2A2A] flex justify-between items-center gap-x-2 w-fit px-2`}
              >
                FAILED
                <div
                  className={`bg-[#CF2A2A] text-white text-center py-2 leading-[150%] h-[20px] w-[20px] rounded-full flex justify-center items-center`}
                >
                  {failedValidation}
                </div>
              </div>

            </div> : <div></div>}
          </div>
          <div>

          </div>
          {/* search and download */}
          <div className={`flex w-fit gap-x-2 justify-between`}>
            <div className={`w-fit border-r-2 pr-1`}>
              <Search placeholder='Search by Customer Name' onKeyUp={onSearchStringChange} />
            </div>
            {hasControls ? <div className={`w-[150px]`}>
              <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='w-full download-table-xls-button rounded'
                table='table-to-xlsx'
                filename='Bulk Customer Validation Profile'
                sheet='Bulk Customer Validation Profile'
                buttonText={<div className={`flex items-center gap-x-2`}><DownloadIcon />Download</div>}
              />
            </div> : null}
          </div>
        </div>
        <div className="shadow overflow-x-auto border-b border-gray-200 mt-10">
          <table id='table-to-xlsx' className={`min-w-full divide-y divide-x divide-gray-200`}>
            <thead className={`bg-gray-50 h-[60px] w-full`}>
              <tr className={`h-[60px] bg-gray-50`}>
                {bulkTableColumns.map((column, index) => {
                  if (column.accessor !== "") {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className={`h-[60px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer`}
                      >
                        <div className={`flex`}>
                          {column.header}
                          {/* <span>
                              {column?.isSorted
                                ? column?.isSortedDesc
                                  ? "▼"
                                  : "▲"
                                : ""}
                              </span> */}
                        </div>
                      </th>
                    )
                  }
                  if (column.accessor === "" && hasControls) {
                    return (<th
                      key={index}
                      scope="col"
                      className={`h-[60px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer`}
                    >
                      <div className={`flex`}>
                        {column.header}
                        {/* <span>
                                      {column?.isSorted
                                        ? column?.isSortedDesc
                                          ? "▼"
                                          : "▲"
                                        : ""}
                                    </span> */}
                      </div>
                    </th>)

                  }
                })}
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200`}>
              {records?.length ? records?.map((row, i) => {
                return (
                  <tr key={i} className={`bg-[#db353905] h-[60px]`}>
                    {bulkTableColumns.map((cell, index) => {
                      if (cell.accessor === "" && hasControls) {
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
                              onClick={() => onDeleteCustomer(i)}
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
                            <span className={`${row[cell.accessor] ? 'bg-[#D4F7DC] text-[#15692A]' : 'bg-[#FFD4D2] text-[#9F1F17]'} h-[26px] px-[8px] py-[1px] rounded font-semibold
                                `}>
                              {cell.mapping[row[cell.accessor]]}
                            </span>
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
                      if (cell.accessor !== "") {
                        return (
                          <td key={index} className={`h-[60px] px-6 py-4 whitespace-nowrap`}>
                            {row[cell.accessor]}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })
                : null
              }
            </tbody>

          </table>
        </div>
        <div className={`flex gap-x-2 mt-4`}>
          {
            failedValidation > 0 ?
              (
                <>
                  <ExclaimateIcon /> {failedValidation} of {uploadedFile.length} Customer(s) Validation Failed, Proceeding Would Discard Failed Validation Records.
                </>
              ) : null
          }
        </div>
      </div>
      {/* : null} */}
    </>
  )
}

BulkTable.defaultProps = {
  uploadedFile: [],
  failedValidation: 0,
  successfulValidation: 0,
  onDeleteCustomer: undefined,
  hasControls: false,
  searchString: null,
  tableTitle: null
}