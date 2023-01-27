import { AdditionalDetailsType } from 'Components/Form/Types/AdditionalTypes'
import AdditionalDetailsTable from 'Components/Form/AdditionalInfo/AdditionalTable'

import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { useState, useEffect } from 'react'
import AdditionalDetailsModalSummary from './AdditionalDetailsModalSummary'

const AdditionalDetailsSummary = () => {
  const additionalDetailsInStorage = sessionStorage.getItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE))
    : null

  const [additionalDetails, setAdditionalDetails] = useState<Array<AdditionalDetailsType>>([])
  const [openAdditionalDetailModalSummary, setOpenAdditionalDetailModalSummary] = useState<boolean>(false)
  const [currentAdditionalDetail, setCurrentAdditionalDetail] = useState<AdditionalDetailsType>(null)

  const handleAdditionalDetailModal = () => {
    setOpenAdditionalDetailModalSummary((prev) => !prev)
  }

  const handleViewAdditionalDetail = (id: number | string) => {
    console.log({ id })
    handleAdditionalDetailModal()
    const singledOutAdditionalDetail = additionalDetails.find((x) => x.id === id)

    setCurrentAdditionalDetail(singledOutAdditionalDetail)
  }

  useEffect(() => {
    if (additionalDetailsInStorage) {
      setAdditionalDetails(additionalDetailsInStorage)
    }
  }, [])

  return (
    <div className='mx-6'>
      <h3 className='font-roboto font-bold text-[1.125rem] leading-[1rem] pt-6 pb-4  ml-12'>Additional Details</h3>
      <AdditionalDetailsTable
        details={additionalDetails}
        handleViewAdditionalDetail={handleViewAdditionalDetail}
        viewAdditionalDetail={true}
        collapsed={false}
      />
      {openAdditionalDetailModalSummary ? (
        <AdditionalDetailsModalSummary closeModalFunction={handleAdditionalDetailModal} singleAdditionalDetail={currentAdditionalDetail} />
      ) : null}
    </div>
  )
}

export default AdditionalDetailsSummary
