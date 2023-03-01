const getProductDetail = (product, field: string): any => {
  if (field === 'product_category') {
    return product.product_category
  }
  if (field === 'product_types') {
    
      return product.product_type
  
  }
  if(field === 'name'){
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
}

export default getProductDetail
