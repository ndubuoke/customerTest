import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { MainScreen, FOURZEROFOUR, CustomerCreationScreen, CustomerAccountModificationScreen, BulkCustomerProcessSummary } from './screens'
// import { TopNav } from 'Components/MainScreenLayout'
import Customer360 from 'Screens/Customer360'
import { AppRoutes } from './routes/AppRoutes'

type Props = {}

const App = ({ }: Props) => {
  return (
    <BrowserRouter>
      {/* <TopNav /> */}
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
  )
}

export default App
