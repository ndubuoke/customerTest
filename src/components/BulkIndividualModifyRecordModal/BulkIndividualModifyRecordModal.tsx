import { memo, useState, useCallback } from 'react';
import { Modal } from 'Components/Modal';
import Button from 'Components/Shareables/Button';

const classes = {
  modal: 'string',
  modalDialog: 'relative bg-white w-[43.75rem]',
  modalContent: 'string',
  modalHeader: 'string',
  modalTitle: 'string',
  modalBody: 'string',
  modalFooter: 'string',
  closeButtonClass: 'string',
  saveButtonClass: 'string',
}

interface Props {
  loading?: boolean,
  isOpen: boolean,
  modalCloseClick: () => void,
}

const BulkIndividualModifyRecordModal = ({
  loading,
  isOpen,
  modalCloseClick,
}: Props) => {
  // const [ step, setStep ] = useState( EstimateSteps.ContactInformation )

  // const onStepChange = useCallback( ( next ) => {
  //   setStep( next )
  // }, [ step ] )

  // const onSubmit = useCallback( () => {
  //   setStep( EstimateSteps.InquirySubmitted )
  // }, [ step ] )

  // const onClose = useCallback( () => {
  //   setStep( EstimateSteps.ContactInformation )
  //   modalCloseClick()
  // }, [ step ] )

  return (
    <Modal
      title="Modify Record"
      isOpen={isOpen}
      classes={classes}
      modalHeader
      modalCloseClick={modalCloseClick}
    >
      <div className={`h-[31.25rem] max-h-[31.25rem] flex flex-col overflow-auto ${'step === EstimateSteps.ContactInformation' ? '' : 'hidden'}`}>
        <div className={`grow`}>

          <div className={`flex w-[483.2px] mt-6 mb-6 gap-6 justify-between items-center `}>
            <div className={`w-1/2 flex justify-start items-center `}>Customer Name</div>
            <div
              className={`w-1/2 border-b border-b-[#8F8F8F]`}
            >

              <input
                className={`w-full border-none outline-none`}
                type={`text`}
                placeholder="Customer Name" />
            </div>
          </div>

          <div className={`flex w-[483.2px] mb-6 gap-6 justify-between items-center `}>
            <div className={`w-1/2 flex justify-start items-center `}>Identification Type</div>
            <div className={`w-1/2 border-b border-b-[#8F8F8F]`}>

              <select
                className={`w-full outline-none border-none`}
              >
                <option className={`w-full`}>BVN</option>
                <option className={`w-full`}>NIN</option>
              </select>
            </div>

          </div>

          <div className={`flex w-[483.2px] mb-6 gap-6 justify-between items-center `}>
            <div className={`w-1/2 flex justify-start items-center `}>Identification Number</div>
            <div
              className={`w-1/2 border-b border-b-[#8F8F8F]`}
            >

              <input
                className={`w-full border-none outline-none`}
                type={`text`}
                placeholder="Identification Number" />
            </div>
          </div>
        </div>
        <div className={`h-[2.75rem] w-full flex justify-center items-center`}>

          <Button
            disabled={false}
            text={`Save`}
            onClick={undefined}
          />
        </div>
      </div>
    </Modal>
  );
}


const BulkIndividualModifyRecordModalMemo = memo(BulkIndividualModifyRecordModal);

export { BulkIndividualModifyRecordModalMemo as BulkIndividualModifyRecordModal };
