
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Customer360 from 'Screens/Customer360';
import { BulkCustomerProcessSummary, CustomerAccountModificationScreen, CustomerCreationScreen, FOURZEROFOUR, MainScreen } from 'Screens/index';
import { AppRoutes } from './AppRoutes';

export const RouteSwitches = () => (
  <BrowserRouter>
    <Routes>

      <Route path={"/"} element={<Navigate replace to={AppRoutes.mainScreen} />} />
      <Route path={AppRoutes.mainScreen} element={<MainScreen />} />
      <Route path={AppRoutes.individualCustomerCreationScreen} element={<CustomerCreationScreen customerType='individual' />} />
      <Route path={AppRoutes.bulkCustomerCreationMakerCheckerScreen} element={<BulkCustomerProcessSummary customerType='individual' headerText='Process Summary' />} />
      <Route path={AppRoutes.SMECustomerCreationScreen} element={<CustomerCreationScreen customerType='sme' />} />
      <Route path={AppRoutes.customerAccountModificationScreen} element={<CustomerAccountModificationScreen />} />
      <Route path={AppRoutes.customer360Screen} element={<Customer360 />} />

      {/* ----------------------NEVER REMOVE THIS------------------ */}
      <Route path={AppRoutes.FOURZEROFOUR} element={<FOURZEROFOUR />} />
      {/* ----------------------NEVER REMOVE THIS------------------ */}
    </Routes>
  </BrowserRouter>
);
