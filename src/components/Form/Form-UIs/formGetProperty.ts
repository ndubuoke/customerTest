import { getProperty, PagePropertyItemType, PagePropertyName } from 'Utilities/getProperty'
import { PageProperties } from '../Types'

export const formGetProperty = (properties: PageProperties, name: PagePropertyName, defaultState: string = '') => {
  return getProperty(properties, name, 'value').text
    ? getProperty(properties, name, 'value').text
    : getProperty(properties, name, 'defaultState').text
    ? getProperty(properties, name, 'defaultState').text
    : defaultState
}
