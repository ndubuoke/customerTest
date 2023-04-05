import { Close } from 'Assets/svgs'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from '../../redux/store'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import { getCustomerProfileAction, getSingleProductAction } from 'Redux/actions/CustomerManagement.actions'
import getProductDetail from 'Utilities/getProductDetail'
import Spinner from '../Shareables/Spinner'
import Button from 'Components/Shareables/Button'
import formatMoney from 'Utilities/formatMoney'
import { useParams } from 'react-router-dom'

type props = {
  productId: string
  setShowProductModal: (e) => void
  assignProductHandler: (e) => void

}

const SingleProductModal = ({ productId, setShowProductModal, assignProductHandler }: props) => {
  const singleProductResponse = useSelector<ReducersType>((state: ReducersType) => state?.singleProduct) as customersManagementResponseType
  const dispatch = useDispatch()
  const customerProfileResponse = useSelector<ReducersType>((state: ReducersType) => state?.customerProfile) as customersManagementResponseType
const customerProfile = customerProfileResponse.serverResponse.data
  let product = { productId: '', productName: '', productCode: '' }
  let { customerId } = useParams()
  const singleProduct = singleProductResponse.serverResponse.data
  const closeModal = () => {
    setShowProductModal(false)
  }

  const assignProductButtonHandler = (data) => {
    closeModal()
    assignProductHandler(data)
  }
  useEffect(() => {
    dispatch(getCustomerProfileAction(customerId) as any)
    dispatch(getSingleProductAction(productId) as any)
  }, [productId,customerId])
    // console.log(singleProduct)
  // console.log(customerProfile)
 
  
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` flex flex-col h-[80%] w-[75%] bg-white py-6 px-6 rounded-2xl `}>
        {singleProductResponse.loading ? (
          <div className='min-h-[18.75rem]   flex items-center justify-center'>
            <Spinner size='large' />
          </div>
        ) : (
          <>
            {!singleProductResponse.loading && singleProductResponse.success ? (
              <div className=' w-full  h-full   flex flex-col p-6 '>
                <div className='flex   justify-between border border-x-0 border-t-0 pb-2   border-b '>
                  <h6 className='text-text-secondary text-[1.5rem] text-[24px] uppercase'>{getProductDetail(singleProduct, 'name')}</h6>
                  <button onClick={closeModal}>
                    <img src={Close} />
                  </button>
                </div>
                <div className='flex flex-col gap-4 w-full h-full justify-between pr-4  mt-6 overflow-y-auto'>
                  {/* product information and operations condition */}

                  <div className='w-full h-[60%] flex gap-6'>
                    <div className='w-[50%] border border-[#E5E9EB] p-6 flex flex-col rounded-md'>
                      <div className='mb-4'>
                        {' '}
                        <h6 className='text-text-secondary text-[1.5rem] text[20px] uppercase'>PRODUCT INFORMATION</h6>
                      </div>
                      <div className='flex w-full'>
                        <div className='w-[50%] '>
                          <h2 className='text-[1rem] text-[#636363;]'>Product Type</h2>
                          <p className='mt-[10px] text-[#636363]'>
                            {getProductDetail(singleProduct, 'product_type') != '' || null
                              ? getProductDetail(singleProduct, 'product_type')
                              : 'Not Available'}
                          </p>
                        </div>

                        <div className='w-[50%] '>
                          <h2 className='text-[1rem] text-[#636363;]'>Product Code</h2>
                          <p className='mt-[10px] text-[#636363]'>{getProductDetail(singleProduct, 'code')}</p>
                        </div>
                      </div>
                      <div className='w-[100%] '>
                        <h2 className='text-[1rem] text-[#636363] mt-[18px]'>Currency</h2>
                        <p className='mt-[10px] text-[#636363]'>{getProductDetail(singleProduct, 'currency')}</p>
                      </div>
                      <div className='flex mt-4'>
                        <div className='w-[50%] flex flex-wrap '>
                          <h2 className='text-[16px] text-[#636363] w-full'>Product Slogan</h2>
                          <p className='mt-[10px] text-[#636363]'>{getProductDetail(singleProduct, 'slogan')}</p>
                        </div>

                        <div className='w-[50%] flex flex-wrap '>
                          <h2 className='text-[16px] text-[#636363] w-full'>Product Description</h2>
                          <p className='mt-[10px] text-[#636363]'>{getProductDetail(singleProduct, 'description')}</p>
                        </div>
                      </div>
                    </div>
                    <div className='w-[50%] border p-4 rounded-md'>
                      <div className='mb-4'>
                        {' '}
                        <h6 className='text-text-secondary text-[1.5rem] text[20px] uppercase'>OPERATING CONDITIONS</h6>
                      </div>
                      <div className='w-[100%] '>
                        <h2 className='text-[1rem] text-[#636363] mt-[18px]'>Minimum Opening Balance</h2>
                        <p className='mt-[10px] text-[#636363]'>
                          {formatMoney(getProductDetail(singleProduct, 'min_opening_balance'))} {getProductDetail(singleProduct, 'currency')}
                        </p>
                      </div>
                      <div className='w-[100%] '>
                        <h2 className='text-[1rem] text-[#636363] mt-[18px]'>Minimum Operating Balance</h2>
                        <p className='mt-[10px] text-[#636363]'>
                          {formatMoney(getProductDetail(singleProduct, 'min_operating_balance'))} {getProductDetail(singleProduct, 'currency')}
                        </p>
                      </div>
                      <div className='w-[100%] '>
                        <h2 className='text-[1rem] text-[#636363] mt-[18px]'>Minimum Cumulative Balance</h2>
                        <p className='mt-[10px] text-[#636363]'>
                          {formatMoney(getProductDetail(singleProduct, 'min_cumulative_balance'))} {getProductDetail(singleProduct, 'currency')}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Accounting entries,tax and charges */}

                  <div className=' border p-6'>
                    <div className='w-full mb-4 '>
                      <h1 className=' text-[20px] text-[#636363]'>ACCOUNTING ENTRIES, CHARGES & TAXES</h1>
                    </div>
                    <div className='w-[100%] '>
                      <table className='table-auto w-full '>
                        <thead className=''>
                          <tr className=' '>
                            <th className='w-[6%] text-center h-[3.9rem]'>
                              <p className='border-r border-l border-common-title text-common-title h-[38%]'>S/N</p>
                            </th>

                            <th className='w-[22%] text-start h-[3.9rem] pl-[1rem]'>
                              <p className=' text-common-title h-[38%]'>Accounting Event</p>
                            </th>

                            <th className='w-[17%] text-start h-[3.9rem]'>
                              <p className='border-r border-l border-common-title pl-[1rem] text-common-title h-[38%]'>DEBIT LEDGER(s)</p>
                            </th>

                            <th className='w-[17%] text-start h-[3.9rem]'>
                              <p className='border-r pl-[1rem] border-common-title text-common-title h-[38%]'>Credit Ledger(s)</p>
                            </th>

                            <th className='w-[18%] text-start h-[3.9rem]'>
                              <p className='border-r pl-[1rem] border-common-title text-common-title h-[38%]'>Applicable Tax(es)</p>
                            </th>

                            <th className='w-[20%] text-start h-[3.9rem]'>
                              <p className='border-r pl-[1rem] border-common-title text-common-title h-[38%]'>Applicable charge(s)</p>
                            </th>
                          </tr>
                        </thead>

                        <tbody className='mt-[20px]'>
                          {singleProduct?.product_accounting_entries?.map((item, index) => {
                            return (
                              <tr className='bg-[#faf7f7] h-[3.5rem] border-t border-b mt-[]' key={index}>
                                <td className='text-center text-[0.9rem] font-medium text-[#636363]'>{index + 1}</td>

                                <td className='pl-[1rem] text-[1rem] font-medium text-[#636363]'>{item?.product_accounting_entry_type}</td>
                                <td className='pl-[1rem] text-[1rem] font-medium text-[#636363]'>{item?.debit_ledger_name} </td>
                                <td className='pl-[1rem] text-[1rem] font-medium text-[#636363]'>{item?.credit_ledger_name}</td>
                                <td className='pl-[1rem] text-[1rem] font-medium text-[#636363]'>
                                  {singleProduct?.applicable_taxes?.length == 0 ? 'n/a' : 'taxes'}
                                </td>

                                <td className='pl-[1rem] text-[1rem] font-medium text-[#636363]'>
                                  {singleProduct?.applicable_charges?.length == 0 ? 'n/a' : 'charges'}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className=' w-full mt-4 flex justify-center items-center '>
                      <Button
                        disabled={false}
                        text={'Assign Product'}
                        onClick={assignProductButtonHandler.bind(null, {
                          productId: getProductDetail(singleProduct, 'product_id'),
                          productName: getProductDetail(singleProduct, 'name'),
                          productCode: getProductDetail(singleProduct, 'code'),
                          productCategory: getProductDetail(singleProduct, 'product_category'),
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default SingleProductModal
