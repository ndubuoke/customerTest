import { EditIcon } from 'Assets/svgs/EditIcon'
import { RemoveIcon } from 'Assets/svgs/RemoveIcon'
import { Search } from 'Components/Search'
import React from 'react'

export const BulkProcessSummaryTable = ({ tableTitle, records, bulkTableColumns, onSearchStringChange }) => {
  return (
    <>
      <div>{tableTitle}</div>
      <div className={`flex w-full gap-x-2 justify-end`}>
        <div className={`w-fit border-r-2 pr-1`}>
          <Search placeholder='Search by Customer Name' onKeyUp={onSearchStringChange} />
        </div>
      </div>
      <div className="shadow overflow-auto border-b border-gray-200 mt-10">
        <table id='table-to-xlsx' className={`min-w-full divide-y divide-x divide-gray-200`}>
          <thead className={`bg-gray-50 h-[3.75rem] w-full`}>
            <tr className={`h-[3.75rem] bg-gray-50`}>
              {bulkTableColumns.map((column, index) => {
                if (column.accessor !== "") {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className={`h-[3.75rem] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer`}
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
                // if (column.accessor === "" && hasControls) {
                //   return (<th
                //     key={index}
                //     scope="col"
                //     className={`h-[3.75rem] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer`}
                //   >
                //     <div className={`flex`}>
                //       {column.header}
                //       {/* <span>
                //                         {column?.isSorted
                //                           ? column?.isSortedDesc
                //                             ? "▼"
                //                             : "▲"
                //                           : ""}
                //                       </span> */}
                //     </div>
                //   </th>)

                // }
              })}
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200`}>
            {records?.length ? records?.map((row, i) => {
              return (
                <tr key={i} className={`bg-[#db353905] h-[3.75rem]`}>
                  {bulkTableColumns.map((cell, index) => {
                    // if (cell.accessor === "" && hasControls) {
                    //   return (
                    //     <td
                    //       key={index}
                    //       className={`h-[3.75rem] px-6 py-4 whitespace-nowrap flex items-center justify-between gap-x-1`}
                    //     >
                    //       {row.status === 0 ?
                    //         <button
                    //           onClick={() => { }}
                    //           // 0rem .125rem .5rem rgba(0, 0, 0, 0.25);
                    //           className={`w-[1.875rem] h-[1.875rem] rounded bg-white shadow-lg flex justify-center items-center`}
                    //         >
                    //           <EditIcon />
                    //         </button>
                    //         : <button></button>
                    //       }

                    //       {/* <button
                    //             onClick={() => onDeleteCustomer(i)}
                    //             className={`w-[1.875rem] h-[1.875rem] rounded bg-white shadow-lg flex justify-center items-center`}
                    //           >
                    //             <RemoveIcon />
                    //           </button> */}

                    //     </td>
                    //   );
                    // }
                    if (cell.mapping) {
                      return (
                        <td
                          key={index}
                          className="h-[3.75rem] px-6 py-4 whitespace-nowrap"
                        >
                          <span className={`${row[cell.accessor] ? 'bg-[#D4F7DC] text-[#15692A]' : 'bg-[#FFD4D2] text-[#9F1F17]'} h-[1.625rem] px-[.5rem] py-[.0625rem] rounded font-semibold
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
                          className=" h-[3.75rem] px-6 py-4 whitespace-nowrap"
                        >
                          {i + 1}
                        </td>
                      );
                    }
                    if (cell.accessor !== "") {
                      return (
                        <td key={index} className={`h-[3.75rem] px-6 py-4 whitespace-nowrap`}>
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
    </>
  )
}
