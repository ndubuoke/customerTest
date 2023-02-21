import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Customer360 from 'Screens/Customer360'
import Customer360Search from 'Screens/Customer360Search'
import {
  BulkCustomerProcessSummary,
  CustomerAccountModificationScreen,
  CustomerCreationScreen,
  FOURZEROFOUR,
  MainScreen,
  ProcessSummary,
} from 'Screens/index'
import { AppRoutes } from './AppRoutes'
import CustomerManagementProcessSummary from '../../screens/CustomerManagementProcessSummary'
import ProductAssignment from '../../components/CustomerManagement/ProductAssignment';

export const RouteSwitches = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Navigate replace to={AppRoutes.mainScreen} />} />
      <Route path={AppRoutes.mainScreen} element={<MainScreen />} />
      <Route path={AppRoutes.individualCustomerCreationScreen} element={<CustomerCreationScreen customerType='individual' />} />
      <Route
        path={AppRoutes.bulkCustomerCreationMakerCheckerScreen}
        element={<BulkCustomerProcessSummary customerType='individual' headerText='Process Summary' />}
      />
      <Route path={AppRoutes.customerManagementProcessSummary} element={<CustomerManagementProcessSummary />} />
      <Route path={AppRoutes.productAssignment} element={<ProductAssignment />} />
      <Route path={AppRoutes.SMECustomerCreationScreen} element={<CustomerCreationScreen customerType='sme' />} />
      <Route path={AppRoutes.customerAccountModificationScreen} element={<CustomerAccountModificationScreen />} />
      <Route path={AppRoutes.customer360Screen} element={<Customer360 />} />
      <Route path={AppRoutes.customer360SearchScreen} element={<Customer360Search />} />
      <Route path={AppRoutes.individualProcessSummary} element={<ProcessSummary headerText={''} customerType={'individual'} />} />
      <Route path={AppRoutes.SMEProcessSummary} element={<ProcessSummary headerText={''} customerType={'sme'} />} />

      {/* ----------------------NEVER REMOVE THIS------------------ */}
      <Route path={AppRoutes.FOURZEROFOUR} element={<FOURZEROFOUR />} />
      {/* ----------------------NEVER REMOVE THIS------------------ */}
    </Routes>
  </BrowserRouter>
)
