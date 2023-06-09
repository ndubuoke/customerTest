export enum STORAGE_NAMES {
  PUBLISHED_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-publishedFormInStorage',
  NEW_FILLING_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-newfillingFormInStorage',
  FILLING_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-fillingFormInStorage',
  BACKUP_FOR_SWITCH_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-backupForSwitchFormInStorage',
  FORM_MODE_STATUS = 'CUSTOMER_MANAGEMENT-FORM_MODE_STATUS',
  STOP_FORM_FILLING_STATUS = 'CUSTOMER_MANAGEMENT-stopFormFillingStatus',
  SHOW_WAIVER_MODAL_IN_FORM = 'CUSTOMER_MANAGEMENT-showWaiverModalInForm',
  SIGNATORY_IN_STORAGE = 'CUSTOMER_MANAGEMENT-signatoryInStorage',
  EXECUTIVE_IN_STORAGE = 'CUSTOMER_MANAGEMENT-executiveInStorage',
  ADDITIONAL_DETAILS_IN_STORAGE = 'CUSTOMER_MANAGEMENT-additionalDetailsInStorage',
  AFFILIATED_COMPANY_DETAILS_IN_STORAGE = 'CUSTOMER_MANAGEMENT-affiliatedCompanyDetailsInStorage',
  SHOW_EDD_MODAL_IN_FORM = 'CUSTOMER-MANAGEMENT-showEddModalInForm',
  CUSTOMER_MANAGEMENT_FORM_MODE_STATUS = 'CUSTOMER_MANAGEMENT-FORM_MODE_STATUS',
  CUSTOMER_MANAGEMENT_MODIFICATION_DATA = 'CUSTOMER_MANAGEMENT_MODIFICATION_DATA',
  FORM_BEHAVIOUR_IN_STORAGE = 'CUSTOMER_MANAGEMENT-formBehaviourInStorage',
}

export const clearAllItemsInStorageForCustomerMGT = () => {
  sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
  sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
  sessionStorage.removeItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
  sessionStorage.removeItem(STORAGE_NAMES.FORM_MODE_STATUS)
  sessionStorage.removeItem(STORAGE_NAMES.STOP_FORM_FILLING_STATUS)
  sessionStorage.removeItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM)
  sessionStorage.removeItem(STORAGE_NAMES.SIGNATORY_IN_STORAGE)
  sessionStorage.removeItem(STORAGE_NAMES.EXECUTIVE_IN_STORAGE)
  sessionStorage.removeItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE)
  sessionStorage.removeItem(STORAGE_NAMES.SHOW_EDD_MODAL_IN_FORM)
  sessionStorage.removeItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_FORM_MODE_STATUS)
  sessionStorage.removeItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_MODIFICATION_DATA)
  sessionStorage.removeItem(STORAGE_NAMES.FORM_BEHAVIOUR_IN_STORAGE)
}
