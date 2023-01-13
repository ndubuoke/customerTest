// import { publishedForm } from 'Components/Form/Form-UIs/sampleForm'

export type SectionProperties = Array<SectionProperty>

export type SectionType = {
  id?: string
  name?: string
  formControlType?: string
  formControlProperties?: Array<FormControlProperties>
  sectionProperties?: SectionProperties
  fields?: Array<FormControlType | ControlFormType>
  status?: string
  statusDesc?: string
  __v?: number | string
}

export type SectionProperty = {
  id?: string
  name?: string
  description?: string
  formControlType?: string
  defaultState?: string
  lastModifiedById?: string
  lastModifiedBy?: string
  createdById?: string
  createdBy?: string
  value?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
}

export type PageProperty = {
  id?: string
  name?: string
  description?: string
  formControlType?: string
  defaultState?: string
  lastModifiedById?: string
  lastModifiedBy?: string
  createdById?: string
  createdBy?: string
  value?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
}

export type PageProperties = Array<PageProperty>

export type HybridFormControlPropertyItemsType = {
  id?: string | any
  formControlType?: string
  defaultState?: number | string
  formControlPropertyItems?: Array<string | number>
  _id?: string
}

export type FormControlProperties = {
  id?: string
  _id?: number | string
  name?: string
  description?: string // 'With character limit of 100. It defines the short text field label'
  formControlType?: string
  defaultState?: string
  formControlPropertyItems?: Array<string | number>
  hybridFormControlPropertyItems?: Array<HybridFormControlPropertyItemsType>
  createdBy?: string
  createdById?: string
  lastModifiedBy?: string
  lastModifiedById?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
  value?: string
}

export type FormControlType = {
  _id?: string
  id?: string
  sectionId?: string
  pageId?: string
  name?: string
  formControlType?: string
  fields?: Array<ControlFormType | FormControlType>
  formControlProperties?: Array<FormControlProperties>
  lastModifiedById?: string
  lastModifiedBy?: string
  createdById?: string
  createdBy?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
}

export type ControlFormProperties = {
  id?: string
  _id?: number | string
  name?: string
  description?: string // 'With character limit of 100. It defines the short text field label'
  formControlType?: string
  defaultState?: string
  formControlPropertyItems?: Array<string | number>
  hybridFormControlPropertyItems?: Array<HybridFormControlPropertyItemsType>
  createdBy?: string
  createdById?: string
  lastModifiedBy?: string
  lastModifiedById?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
  value?: string
}

export type ControlFormType = {
  _id?: string
  id?: string
  name?: string
  formControlType?: string
  formControlProperties?: Array<ControlFormProperties>
  lastModifiedById?: string
  lastModifiedBy?: string
  createdById?: string
  createdBy?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
}

export type PageInstance = {
  id?: string
  name?: string
  formControlType?: string
  pageProperties?: PageProperties
  sections?: Array<SectionType>
  fields?: Array<FormControlType | ControlFormType>
  status?: string
  statusDesc?: string
  __v?: number | string
  sectionId?: number | string
}

export type Form = {
  id?: string
  _id?: string
  name?: string
  description?: string
  formType?: string
  formTypeDesc?: string
  formStatus?: string
  version?: number
  lastModifiedById?: string
  lastModifiedBy?: string
  createdById?: string
  createdBy?: string
  builtFormMetadata: {
    pages?: Array<PageInstance>
    conditions?: Array<any>
  }
  __v?: number | string
}

export type PagePropertyName =
  | 'Field label'
  | 'Placeholder'
  | 'Col Span'
  | 'Visibility'
  | 'Allow modification after submission'
  | 'Set as Required'
  | 'Toggle help text'
  | 'Help text'
  | 'Dropdown Options List'
  | 'Specify Options List'
  | 'Specify API'
  | 'Upload List'
  | 'Specify URL'
  | 'Enable multiple selection of options'
  | 'Default selection'
  | 'Enable External Integration'
  | 'Specify Integration API'
  | 'Page name'
  | 'Section name'
  | 'Swap label position'
  | 'Type'
  | 'Allowable File Types'
  | 'Allowable start date'
  | 'Allowable end date'
  | 'Label'
  | 'Character Type'
  | 'Minimum Number of characters'
  | 'Maximum Number of characters'
  | 'Minimum numeric input'
  | 'Maximum numeric input'
  | 'Options arrangement'
  | 'Options List'
  | 'Step size'
  | 'Maximum Number of Files'
  | 'Button Type'
  | 'Country Code Options List'
  | 'Time format'
  | 'Lowerbound (Min)'
  | 'Upperbound (Max)'

export type PagePropertyItemType =
  | 'value'
  | 'defaultState'
  | 'name'
  | 'description'
  | 'formControlType'
  | 'lastModifiedById'
  | 'lastModifiedBy'
  | 'createdById'
  | 'createdBy'
  | 'status'
  | 'statusDesc'
  | 'createdAt'
  | 'updatedAt'
  | 'formControlPropertyItems'

export enum PagePropertyNameEnum {
  FieldLabel = 'Field label',
  Placeholder = 'Placeholder',
  ColSpan = 'Col Span',
  Visibility = 'Visibility',
  AllowModificationAfterSubmission = 'Allow modification after submission',
  SetAsRequired = 'Set as Required',
  ToggleHelpText = 'Toggle help text',
  HelpText = 'Help text',
  DropdownOptionsList = 'Dropdown Options List',
  SpecifyOptionsList = 'Specify Options List',
  SpecifyAPI = 'Specify API',
  AllowableFileTypes = 'Allowable File Types',
  UploadList = 'Upload List',
  SpecifyURL = 'Specify URL',
  EnableMultipleSelectionOfOptions = 'Enable multiple selection of options',
  DefaultSelection = 'Default selection',
  EnableExternalIntegration = 'Enable External Integration',
  SpecifyIntegrationAPI = 'Specify Integration API',
  pageName = 'Page name',
  AllowableStartDate = 'Allowable start date',
  AllowableEndDate = 'Allowable end date',
  Label = 'Label',
  sectionName = 'Section name',
  swapLabelPosition = 'Swap label position',
  CharacterType = 'Character Type',
  MinimumNumberOfCharacters = 'Minimum Number of characters',
  MaximumNumberOfCharacters = 'Maximum Number of characters',
  MinimumNumericInput = 'Minimum numeric input',
  MaximumNumericInput = 'Maximum numeric input',
  OptionsArrangement = 'Options arrangement',
  OptionsList = 'Options List',
  StepSize = 'Step size',
  MaximumNumberOfFiles = 'Maximum Number of Files',
  Type = 'Type',
  ButtonType = 'Button Type',
  CountryCodeOptionsList = 'Country Code Options List',
  TimeFormat = 'Time format',
  Lowerbound = 'Lowerbound (Min)',
  Upperbound = 'Upperbound (Max)',
}

export enum PagePropertyItemTypeEnum {
  value = 'value',
  defaultState = 'defaultState',
  name = 'name',
  description = 'description',
  formControlType = 'formControlType',
  lastModifiedById = 'lastModifiedById',
  lastModifiedBy = 'lastModifiedBy',
  createdById = 'createdById',
  createdBy = 'createdBy',
  status = 'status',
  statusDesc = 'statusDesc',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  formControlPropertyItems = 'formControlPropertyItems',
}

export function getProperty(properties: PageProperties, name: PagePropertyName, type: PagePropertyItemType = 'value'): { text?: string; list?: any } {
  const item = properties?.find((property) => property.name === name) as PageProperty | SectionProperty

  if (item) {
    return { text: item[type], list: item }
  }

  return { text: '', list: [] }
}

export function replaceSpecialCharacters(text: string) {
  return text?.replace(/[^\w\s]/gi, '')
}

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

// const _data = publishedForm?.serverResponse?.data as Form
// const feed = _data?.builtFormMetadata?.pages

export const dataFormatter = (data: Array<PageInstance>) => {
  const groupedSections = []
  data?.forEach((page, index) => {
    if (page?.sections?.length > 0) {
      page?.sections?.map((x) => {
        const items = {}
        page?.sections?.forEach((x, i) => {
          console.log({ x })
          items[
            camelize(
              replaceSpecialCharacters(
                getProperty(x?.formControlProperties, 'Field label', 'value').text ||
                  getProperty(x?.formControlProperties, 'Field label', 'defaultState').text ||
                  `Default${i + 1}`
              )
            )
          ] = ''
        })

        const sectionDetails = {
          sectionName: getProperty(x?.formControlProperties, 'Section name', 'value').text,
          data: items,
        }

        groupedSections.push(sectionDetails)
      })
    }
    if (page?.fields?.length > 0) {
      const items = {}
      page?.fields?.forEach((x, i) => {
        console.log({ y: x })
        items[
          camelize(
            replaceSpecialCharacters(
              getProperty(x?.formControlProperties, 'Field label', 'value').text ||
                getProperty(x?.formControlProperties, 'Field label', 'defaultState').text ||
                `Default${i + 1}`
            )
          )
        ] = ''
      })

      const sectionDetailsForPage = {
        sectionName: getProperty(page?.pageProperties, 'Page name', 'value').text,
        data: items,
      }

      groupedSections.push(sectionDetailsForPage)
    }
  })

  return groupedSections
}
