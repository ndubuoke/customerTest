import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { Form, PageInstance } from '../Types'
import StepNumbers from './StepNumbers'

type Props = {
  setActivePageState: (val: PageInstance) => void
}

const Steps = ({ setActivePageState }: Props) => {
  const [form, setForm] = useState<Form>(null)
  const [activePage, setActivePage] = useState<PageInstance>(null)

  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  const handleActivePage = (index: number) => {
    setActivePage(form?.builtFormMetadata?.pages[index])
    setActivePageState(form?.builtFormMetadata?.pages[index])
  }

  useEffect(() => {
    if (publishedForm?.success) {
      setForm(publishedForm?.serverResponse?.data)
    }
  }, [publishedForm])

  useEffect(() => {
    if (publishedForm) {
      setActivePageState(publishedForm?.serverResponse?.data?.builtFormMetadata?.pages[0])
    }
  }, [publishedForm])

  return (
    <div className='flex justify-center items-center min-h-[120px] '>
      <div className='max-w-[991px] overflow-auto mx-auto '>
        <div className=' flex justify-end w-fit z-10'>
          {form?.builtFormMetadata?.pages?.map((page: PageInstance, index: number) => {
            console.log({
              page,
              activePage,
            })
            return (
              <StepNumbers
                key={index}
                page={page}
                index={index}
                last={form?.builtFormMetadata?.pages.length === index + 1}
                onClick={(index) => handleActivePage(index)}
                isActive={page?.id === activePage?.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Steps
