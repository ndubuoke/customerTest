import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainScreen, FOURZEROFOUR, CustomerCreationScreen, CustomerAccountModificationScreen } from './screens'
import { TopNav } from 'Components/MainScreenLayout'
import { AppRoutes } from './routes'
import Customer360 from 'Screens/Customer360'

type Props = {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path={AppRoutes.mainScreen} element={<MainScreen />} />
        <Route path={AppRoutes.individualCustomerCreationScreen} element={<CustomerCreationScreen customerType='individual' />} />
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
