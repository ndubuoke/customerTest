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

type HybridFormControlPropertyItemsType = {
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

export type SectionProperties = Array<SectionProperty>

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

// For impure fields - the one containing sections
export type FormControlTypeWithSection = {
  _id?: string
  id?: string
  name?: string
  formControlType?: string
  formControlProperties?: Array<FormControlProperties>
  sectionProperties?: SectionProperties
  fields?: Array<FormControlType>
  lastModifiedById?: string
  lastModifiedBy?: string
  createdById?: string
  createdBy?: string
  status?: string
  statusDesc?: string
  createdAt?: string
  updatedAt?: string
  __v?: number | string
  sectionId?: number | string
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
