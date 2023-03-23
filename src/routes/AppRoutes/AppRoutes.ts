/**  This is the customer_management_base_route */
export const CMR = '/customer-management'

/**This is the route used generally in the app */
export const AppRoutes = {
  // mainScreen: '/',
  mainScreen: CMR + '/',
  individualCustomerCreationScreen: CMR + '/individual-customer-creation',
  bulkCustomerCreationMakerCheckerScreen: CMR + '/bulk-customer',
  SMECustomerCreationScreen: CMR + '/sme-customer-creation',
  // customer 360
  customer360SearchScreen: CMR + '/customer-360',
  customer360Screen: CMR + '/customer-360/:customerId',
  customer360ProfileScreen: CMR + '/customer-360/:customerId/profile',
  customerManagementProcessSummary: CMR + '/process-summary/:requestId',
  productAssignment: CMR + '/product-assignment/:customerId',
  // process summary
  individualProcessSummary: CMR + '/individual-customer-creation/process-summary',
  SMEProcessSummary: CMR + '/sme-customer-creation/process-summary',
  // customer related routes
  customerAccountModificationScreen: CMR + '/:customerId',
  customerAccountProfile: CMR + '/:customerId/view',
  customerAccountProfileModify: CMR + '/:customerId/edit',
  customerAccountProfileDeactivate: CMR + '/:customerId/deactivate',
  // 404
  FOURZEROFOUR: CMR + '*',
}

export const AppLinks = {
  myTeam: '',
  help: '',
  profile: '',
  notifications: '',
}
