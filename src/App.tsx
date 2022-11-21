import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import {
  MainScreen,
  FOURZEROFOUR,
  CustomerCreationScreen,
  CustomerAccountModificationScreen,
  BulkCustomerProcessSummary,
  ProcessSummary,
} from './screens'
// import { TopNav } from 'Components/MainScreenLayout'
import Customer360 from 'Screens/Customer360'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouteSwitches } from './routes/AppRoutes'
import { getRolesAndPermissions, getUserProfile } from 'Redux/actions/UserPersmissions'

type Props = {}

const App = ({}: Props) => {
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile())
    dispatch(getRolesAndPermissions())
  }, [])

  return <RouteSwitches />
}

export default App
