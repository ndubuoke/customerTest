const mapRouteParam = (route: string, paramString: string, paramValue: string) => {
  return route.replace(paramString, paramValue)
}
 
export default mapRouteParam;