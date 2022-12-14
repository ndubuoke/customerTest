import axios from 'axios'

const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'

type Props = {
  idType: 'bvn' | 'nin' | 'pvc' | 'drivers license'
  idNumber: string | number
}
export const useIdFormPrefiller = ({ idNumber, idType }: Props) => {
  const getIdForm = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/v1/verification/${idType}/${idNumber}`, config)
      return data
    } catch (error) {
      return error
    }
  }

  return { getIdForm: getIdForm() }
}
