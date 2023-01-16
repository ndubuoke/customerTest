import { SignatoryDetailsType } from 'Components/Form/Types/SignatoryTypes'
import { ExecutiveDetailsType } from 'Components/Form/Types/ExecutiveTypes'
import ExecutivesTable from 'Components/Form/ExecutiveandDirector/ExecutiveTable'

import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { useState, useEffect } from 'react'
import ExecutiveModalSummary from './ExecutiveModalSummary'

type Props = {}

const ExecutiveSummary = (props: Props) => {
  const executiveInStorage = sessionStorage.getItem(STORAGE_NAMES.EXECUTIVE_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.EXECUTIVE_IN_STORAGE))
    : null

  const [executives, setExecutives] = useState<Array<ExecutiveDetailsType>>([])
  const [openExecutiveModalSummary, setOpenExecutiveModalSummary] = useState<boolean>(false)
  const [currentExecutive, setCurrentExecutive] = useState<ExecutiveDetailsType>(null)

  const handleExecutiveModal = () => {
    setOpenExecutiveModalSummary((prev) => !prev)
  }

  const handleViewExecutive = (id: number | string) => {
    console.log({ id })
    handleExecutiveModal()
    const singledOutExecutive = executives.find((x) => x.id === id)

    setCurrentExecutive(singledOutExecutive)
  }

  useEffect(() => {
    if (executiveInStorage) {
      setExecutives(executiveInStorage)
    }
  }, [])

  return (
    <div className='mx-6'>
      <h3 className='font-roboto font-bold text-[18px] leading-[16px] pt-6 pb-4  ml-12'>Executive/Directors Details</h3>
      <ExecutivesTable executives={executives} handleViewExecutive={handleViewExecutive} viewExecutive={true} collapsed={false} />
      {openExecutiveModalSummary ? <ExecutiveModalSummary closeModalFunction={handleExecutiveModal} singleExecutive={currentExecutive} /> : null}
    </div>
  )
}

export default ExecutiveSummary
