// PLEASE LEAVE THIS SECTION (USED TO IDENTIFY TYPES)
// TEXT_INPUT: "text_input",
//   TOGGLE: "toggle", toggle
//   DROPDOWN_FIELD: "dropdown_field",
//   TEXTAREA: "textarea",
//   NUMERICAL_INPUT: "numerical_input",
//   INTEGER_INPUT: "integer_input",
//   TIME_INPUT: "time_input",
//   DATE_INPUT: "date_input",
//   DECIMAL_INPUT: "decimal_input",
//   FILE_UPLOAD_ZONE: "file_upload_zone",
//   SECTION: "section",
//   PAGE: "page",
//   CHECKBOX: "checkbox",
//   LABEL: "label",
//   HYBRID: "hybrid",
//   HEADING: "heading",
//   BUTTON: "button",
//   PASSWORD: "password",

import { PageProperties, PageProperty, SectionProperty } from 'Components/Form/Types'

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
