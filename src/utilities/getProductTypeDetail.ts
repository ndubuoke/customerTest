const getProductTypeDetail = (product, field: string): any => {
  if (field === 'product_category') {
    return product.product_category
  }
  if (field === 'product_types') {
    
      return product.product_type
  
  }
}

export default getProductTypeDetail
