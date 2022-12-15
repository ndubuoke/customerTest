import axios, { AxiosError } from 'axios'
import { useState } from 'react'

const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'

export enum PrefillerIDTypeLengths {
  BVN = 11,
  NIN = 11,
  'Customer Account Number' = 10,
  'Customer ID' = 9,
}

export type PrefillerIDTypeType = 'BVN' | 'NIN' | 'Customer ID' | 'Customer Account Number'

export type Props = {
  idType: PrefillerIDTypeType
  idNumber: string | number
}

export type ErrorType = {
  status: boolean
  statusCode: number
  message: string
}

const errorInitial = {
  status: false,
  statusCode: null,
  message: '',
}
export const useIdFormPrefiller = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorType>(errorInitial)
  const [success, setSuccess] = useState<boolean>(false)
  const [response, setResponse] = useState<any>(null)

  const getIdDetails = async ({ idNumber, idType }: Props) => {
    try {
      setError(errorInitial)
      setLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/v1/customer-signatory/${idNumber}`, config)
      setLoading(true)
      setSuccess(true)
      setResponse(data)
      console.log({ data })
      return data
    } catch (error) {
      console.log({ 'The error': error })
      setError((prev) => ({
        ...prev,
        message: error?.message,
        status: true,
        statusCode: error?.code,
      }))
      setLoading(false)
    }
  }

  return { loading, success, error, response, getIdDetails }
}
