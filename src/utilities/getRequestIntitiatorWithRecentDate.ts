const getRequestObjectWithRecentDate = (requestArray:any[]) =>{
if (Array.isArray(requestArray) && requestArray.length > 0) {
  const requestObject = requestArray.reduce((a, b) => (a.createdAt > b.createdAt ? a : b))
  
  return requestObject?.initiator
}
}

export default getRequestObjectWithRecentDate