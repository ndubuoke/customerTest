/**  This is the customer_management_base_route */
export const CMR = '/customer-management'

/**This is the route used generally in the app */
export const AppRoutes = {
  // mainScreen: '/',
  mainScreen: CMR + '/',
  individualCustomerCreationScreen: CMR + '/individual-customer-creation',
  bulkCustomerCreationMakerCheckerScreen: CMR + '/bulk-customer',
  SMECustomerCreationScreen: CMR + '/sme-customer-creation',
  customerAccountModificationScreen: CMR + '/:customerId',
  customer360Screen: CMR + '/customer-360/:customerId',

  // 404
  FOURZEROFOUR: CMR + '*',
}

export const AppLinks = {
  myTeam: '',
  help: '',
  profile: '',
  notifications: '',
}