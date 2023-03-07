import { Close } from 'Assets/svgs'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from '../../redux/store'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import { getSingleProductAction } from 'Redux/actions/CustomerManagement.actions'
import getProductDetail from 'Utilities/getProductDetail'
import Spinner from '../Shareables/Spinner'
import Button from 'Components/Shareables/Button'

type props = {
  productId: string
  setShowProductModal: (e) => void
}

const SingleProductModal = ({ productId, setShowProductModal }: props) => {
  const singleProductResponse = useSelector<ReducersType>((state: ReducersType) => state?.singleProduct) as customersManagementResponseType
  const dispatch = useDispatch()
  const singleProduct = singleProductResponse.serverResponse.data
  const closeModal = () => {
    setShowProductModal(false)
  }
  useEffect(() => {
    dispatch(getSingleProductAction(productId) as any)
  }, [productId])
  console.log(singleProduct)
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` flex flex-col h-[90%] min-w-[70%] bg-white py-6 px-6 rounded-2xl `}>
        {singleProductResponse.loading ? (
          <div className='min-h-[18.75rem]   flex items-center justify-center'>
            <Spinner size='large' />
          </div>
        ) : (
          <>
            {!singleProductResponse.loading && singleProductResponse.success ? (
              <div className=' w-full  h-full   flex flex-col p-6 '>
                <div className='flex   justify-between  '>
                  <h6 className='text-text-secondary text-[1.5rem] text-3xl uppercase'>{getProductDetail(singleProduct, 'name')}</h6>
                  <button onClick={closeModal}>
                    <img src={Close} />
                  </button>
                </div>
                <div className='flex flex-col w-full h-full justify-between  mt-6'>
                  <div className='flex  w-full h-[85%] '>
                    <div className='w-[50%] flex justify-center items-center '>
                      {' '}
                      <span className='flex w-full  gap-4  items-center text-md'>
                        Product Description: <h6 className=' text-sm  '>{getProductDetail(singleProduct, 'description')}</h6>
                      </span>
                    </div>
                    <div className='w-[50%]  border-4 rounded-md p-8'>
                      <h6 className='text-text-secondary text-lg uppercase'>PRODUCT SUMMARY</h6>
                      <div className='mt-12 text-text-secondary'>
                        <ul>
                          <li className='font-bold'>
                            {' '}
                            . Product Code : <span className='text-common-title font-normal'>{getProductDetail(singleProduct, 'code')} </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . Slogan : <span className='text-common-title font-normal capitalize'>
                              {getProductDetail(singleProduct, 'slogan')}{' '}
                            </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . Minimum Opening Balance :{' '}
                            <span className='text-common-title font-normal capitalize'>
                              N{getProductDetail(singleProduct, 'min_opening_balance')}{' '}
                            </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . Minimum Operating Balance :{' '}
                            <span className='text-common-title font-normal capitalize'>
                              N{getProductDetail(singleProduct, 'min_operating_balance')}{' '}
                            </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . Transaction Channels :{' '}
                            <span className='text-common-title font-normal capitalize'>
                              {getProductDetail(singleProduct, 'payment_channel')}{' '}
                            </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . Transaction Limits :{' '}
                            <span className='text-common-title font-normal capitalize'>
                              {getProductDetail(singleProduct, 'max_cumulative_transaction_amount')}{' '}
                              {getProductDetail(singleProduct, 'max_cumulative_transaction_period')}
                            </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . ATM Withdrawal Limit :{' '}
                            <span className='text-common-title font-normal capitalize'>
                              {/* {getProductDetail(singleProduct, 'max_cumulative_transaction_amount')}{' '}
                              {getProductDetail(singleProduct, 'max_cumulative_transaction_period')} */}
                            </span>{' '}
                          </li>
                          <li className='font-bold'>
                            {' '}
                            . Interest :{' '}
                            <span className='text-common-title font-normal capitalize'>
                              {/* {getProductDetail(singleProduct, 'max_cumulative_transaction_amount')}{' '}
                              {getProductDetail(singleProduct, 'max_cumulative_transaction_period')} */}
                            </span>{' '}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className=' w-full  flex justify-center items-center '>
                    <Button disabled={false} text={'Assign Product'} onClick={() => {}} />
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
