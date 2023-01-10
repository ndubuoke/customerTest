import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activePageAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { Form, PageInstance } from '../Types'
import StepNumbers from './StepNumbers'
import { getProperty } from 'Utilities/getProperty'

type Props = {
  // SME SHOW ONLY EXECUTIVE CHECK
  customerType?: 'sme' | 'individual'
  setActivePageState: (val: PageInstance) => void
  activePageState: PageInstance
  canSubmit: boolean
  setCanSubmit: (prev: boolean) => void
  canNext: boolean
  setCanNext: (prev: boolean) => void
  pageIndex: number
  setPageIndex: (prev: React.SetStateAction<number>) => void
}

const Steps = ({ setActivePageState, activePageState, setCanSubmit, canSubmit, customerType, pageIndex, setPageIndex }: Props) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState<Form>(null)

  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType
  // console.log('publishedForm', publishedForm)
  const handleActivePage = (index: number) => {
    const page = form?.builtFormMetadata?.pages[index]
    console.log('form', form?.builtFormMetadata?.pages)
    console.log('page-index', index)
    console.log('page', page)
    dispatch(activePageAction(page, index) as any)
    setActivePageState(page)
    setPageIndex(index)
  }

  useEffect(() => {
    if (publishedForm?.success) {
      setForm(publishedForm?.serverResponse?.data)
      // setForm(
      //   customerType === 'sme'
      //     ? publishedForm?.serverResponse?.data
      //     : {
      //         ...publishedForm?.serverResponse?.data,
      //         builtFormMetadata: {
      //           ...publishedForm?.serverResponse?.data.builtFormMetadata,
      //           pages: publishedForm?.serverResponse?.data.builtFormMetadata.pages.filter(
      //             (page) => getProperty(page?.pageProperties, 'Page name', 'value').text !== 'Executive/Directors Information'
      //           ),
      //         },
      //       }
      // )
    }
  }, [publishedForm])

  useEffect(() => {
    if (publishedForm) {
      const page = publishedForm?.serverResponse?.data?.builtFormMetadata?.pages[0]
      dispatch(activePageAction(page, 0) as any)
      setActivePageState(page)
    }
  }, [publishedForm])

  return (
    <div className=' flex justify-center items-center min-h-[120px] '>
      <div className='max-w-[991px] overflow-auto mx-auto '>
        <div className='z-10 flex justify-end  w-fit'>
          {form?.builtFormMetadata?.pages?.map((page: PageInstance, index: number) => {
            return (
              <StepNumbers
                key={index}
                page={page}
                index={index}
                last={form?.builtFormMetadata?.pages.length === index + 1}
                onClick={(index) => handleActivePage(index)}
                isActive={page?.id === activePageState?.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Steps
