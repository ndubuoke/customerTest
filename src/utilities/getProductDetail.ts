const getProductDetail = (product, field: string): any => {
  if (field === 'product_category') {
    return product.product_category
  }
  if (field === 'product_type') {
    return product.product_type?.name
  }
  if (field === 'product_type_id') {
    return product.product_type_id
  }
  if (field === 'name') {
    return product.name
  }
  if (field === 'code') {
    return product.code
  }
  if (field === 'currency') {
    return product.currency
  }
  if (field === 'description') {
    return product.description
  }
  if (field === 'product_id') {
    return product.product_id
  }
  if (field === 'slogan') {
    return product.slogan
  }
  if (field === 'payment_channel') {
    return product.payment_channel
  }

  if (field === 'min_operating_balance') {
    return product.product_operating_conditions.map((data) => {
      return parseInt(data.min_opert_bal)
    })
  }
  if (field === 'min_opening_balance') {
    return product.product_operating_conditions.map((data) => {
      return parseInt(data.min_opening_bal)
    })
  }

  if (field === 'max_cumulative_balance') {
    return product.product_operating_conditions.map((data) => {
      return parseInt(data.max_cum_bal)
    })
  }
  if (field === 'max_cumulative_transaction_amount') {
    return product.transaction_limits.map((data) => {
      return data.max_cumulative_transaction_amount
    })
  }
  if (field === 'max_cumulative_transaction_period') {
    return product.transaction_limits.map((data) => {
      return data.max_cumulative_transaction_period
    })
  }
  if (field === 'applicable_charges') {
    return product.product_accounting_entries.map((data) => {
      return data.applicable_charges.map((data) => {
        return data.charge_name
      })
    })
  }
  if (field === 'applicable_taxes') {
    return product.product_accounting_entries.map((data) => {
      return data.applicable_taxes.map((data) => {
        return data.tax_name
      })
    })
  }
}

export default getProductDetail
