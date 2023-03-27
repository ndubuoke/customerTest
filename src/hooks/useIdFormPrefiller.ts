import axios, { AxiosError } from 'axios'
import { useState } from 'react'

const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'

export enum PrefillerIDTypeLengths {
  BVN = 11,
  NIN = 11,
  'Customer Account Number' = 10,
  'Customer ID' = 9,
  "Permanent Voter's Card" = 10,
  "Driver's License" = 10,
}
// https://customer-management-api-dev.reventtechnologies.com/v1/verification/bvn/34245367643
export type PrefillerIDTypeType = 'BVN' | 'NIN' | 'Customer ID' | 'Customer Account Number' | "Permanent Voter's Card" | "Driver's License"
export type PrefillerIDTypeTypeLower = 'bvn' | 'nin' | 'Customer ID' | 'Customer Account Number' | 'pvc' | 'dl'

export type Props = {
  idType: PrefillerIDTypeTypeLower
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

      const url = (id: string, number: string | number) => {
        switch (id) {
          case 'Customer ID':
            return `${SERVER_URL}/v1/customer-signatory/${number}`

          default:
            return `${SERVER_URL}/v1/verification/${id}/${number}`
        }
      }

      const { data } = await axios.get(url(idType, idNumber), config)
      setLoading(false)
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
