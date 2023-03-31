import getRequestIntitiatorWithRecentDate from './getRequestIntitiatorWithRecentDate'
const getCustomerDetail = (customer, field: string): string | string[] | '' => {
  if (field === 'surname') {
    return customer.customer_profiles.map((profile) => {
      return profile.surname
    })
  }
  if (field === 'mobileNumber') {
    return customer.customer_profiles.map((profile) => {
      return profile.mobileNumber
    })
  }
  if (field === 'accountNumber') {
    if (customer.customer_products.length === 0) {
      return 'Not Available'
    } else {
      return customer.customer_products[0].accountNumber
    }
  }
  if (field === 'firstName') {
    return customer.customer_profiles.map((profile) => {
      return profile.firstName
    })
  }
  if (field === 'email') {
    return customer.customer_profiles.map((profile) => {
      return profile.email
    })
  }
  if (field === 'customerEntityId') {
    return customer.customer_profiles.map((profile) => {
      return profile.customerEntityId
    })
  }

  if (field === 'motherMaidenName') {
    return customer.customer_profiles.map((profile) => {
      return profile.motherMaidenName
    })
  }
  if (field === 'otherNames') {
    return customer.customer_profiles.map((profile) => {
      return profile.otherNames
    })
  }
  if (field === 'customerId') {
    return customer.customer_profiles.map((profile) => {
      return profile.customerId
    })
  }
  if (field === 'bvn') {
    return customer.customer_profiles.map((profile) => {
      return profile.bvn
    })
  }
  if (field === 'riskStatus') {
    return customer.customer_profiles.map((profile) => {
      return profile.riskStatus
    })
  }
  if (field === 'customerGroups') {
    return customer.customer_profiles.map((profile) => {
      return profile.customerGroups
    })
  }
  if (field === 'initiator') {
    return getRequestIntitiatorWithRecentDate(customer?.requests)
  }
}

export default getCustomerDetail
