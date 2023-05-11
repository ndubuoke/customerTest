const behaviorData = {
  status: 'success',
  message: 'Form controls behaviours data fetched successfully',
  data: {
    _id: '6433f5bf6241b539660dcfb1',
    formType: 'individualAccelerated',
    behaviourStatus: 'Published',
    version: 63,
    behaviours: [
      {
        config: {
          conditions: [
            {
              field: 'if',
              render: 'select',
            },
            {
              field: 'state',
              render: 'select',
            },
            {
              field: 'value',
              render: 'select',
            },
          ],
          actions: [
            {
              type: 'do',
              render: 'select',
            },
            {
              type: 'form member',
              render: 'select',
            },
          ],
        },
        _id: '634945e9f7ca6c97482fb655',
        name: 'Show/Hide Field, Section or Page',
        info: 'Change visibility of field(s) depending on `IF` State conditions.',
        createdBy: 'Samuel',
        createdById: '5567',
        lastModifiedBy: 'Samuel',
        lastModifiedById: '445',
        status: 'active',
        statusDesc: 'The record is active',
        createdAt: '2022-10-14T11:20:09.050Z',
        updatedAt: '2022-10-14T11:20:09.050Z',
        __v: 0,
        condition: {
          if: 'Page:PERSONAL INFORMATIONS > Section:Bio-data > Field:Date of Birth',
          state: 'is Empty',
          value: '',
        },
        actions: [
          {
            type: 'Show/Hide',
            option: 'Hide Field',
            formMember: 'Page:PERSONAL INFORMATION > Section:Bio-data > Field:Marital Status',
            to: '',
          },
          {
            type: 'Show/Hide',
            option: 'Hide Section',
            formMember: 'Page:PERSONAL INFORMATIONS > Section:Bio-data',
            to: '',
          },
          {
            type: 'Show/Hide',
            option: 'Hide Section',
            formMember: 'Page:ADDITIONAL ACCT INFORMATION > Section:Extra Account Information',
            to: '',
          },
        ],
      },
      {
        config: {
          conditions: [
            {
              field: 'if',
              render: 'select',
            },
            {
              field: 'state',
              render: 'select',
            },
          ],
          actions: [
            {
              type: 'update',
              render: 'select',
            },
            {
              type: 'to',
              render: 'textarea',
            },
          ],
        },
        _id: '63497973f7ca6c97482fbbe4',
        name: 'Update/Calculate Field',
        info: 'Use values from fields to do update other fields.',
        createdBy: 'Samuel',
        createdById: '5567',
        lastModifiedBy: 'Samuel',
        lastModifiedById: '445',
        status: 'active',
        statusDesc: 'The record is active',
        createdAt: '2022-10-14T15:00:03.727Z',
        updatedAt: '2022-10-26T07:28:46.100Z',
        __v: 0,
        condition: {
          if: 'Page:PERSONAL INFORMATIONS > Section:Bio-data > Field:Gender',
          state: 'is Filled',
          value: '',
        },
        actions: [
          {
            type: 'Update/Calculate',
            option: '',
            formMember: 'Page:PERSONAL INFORMATIONS > Section:Identity Information  > Field:BVN',
            to: 'updatig this',
          },
        ],
      },
      {
        config: {
          conditions: [
            {
              field: 'if',
              render: 'select',
            },
            {
              field: 'state',
              render: 'select',
            },
            {
              field: 'value',
              render: 'select',
            },
          ],
          actions: [
            {
              type: 'skip',
              render: 'select',
            },
            {
              type: 'to',
              render: 'select',
            },
          ],
        },
        _id: '634979f9f7ca6c97482fbbf8',
        name: 'Skip to Field, Section or Page',
        info: 'Allow users to jump to a part of the form according to their choices.',
        createdBy: 'Samuel',
        createdById: '5567',
        lastModifiedBy: 'Samuel',
        lastModifiedById: '445',
        status: 'active',
        statusDesc: 'The record is active',
        createdAt: '2022-10-14T15:02:17.709Z',
        updatedAt: '2022-10-14T15:02:17.709Z',
        __v: 0,
        condition: {
          if: 'Page:PERSONAL INFORMATIONS',
          state: 'is Empty',
          value: '',
        },
        actions: [
          {
            type: 'Skip',
            option: 'Skip Page',
            formMember: 'Page:PERSONAL INFORMATIONS',
            to: '',
          },
        ],
      },
    ],
    createdBy: 'System admin',
    createdById: 'System admin',
    lastModifiedBy: 'System admin',
    lastModifiedById: 'System admin',
    createdAt: '2023-04-10T11:40:47.677Z',
    updatedAt: '2023-04-10T11:40:47.677Z',
    __v: 0,
  },
}

interface IParsedBehaviour {
  actions: {
    fieldName: string
    option: 'Hide Page'
    pageName: string
    sectionName: string
    to: string
    type: 'Show/Hide' | 'Update/Calculate'
  }[]
  condition: 'is Empty' | 'is Filled' | 'is Equal To' | 'is Not Equal To'
  fieldName: string
  pageName: string
  sectionName: string
  value?: string
}

export const parseBehavior = (data): IParsedBehaviour[] => {
  // const conditions = []
  // const actions = []
  // console.log('parseBehavior_data', data)
  return data.map((behavior) => {
    let { condition, actions } = behavior
    // conditions.push(condition)
    // actions.push(action)
    const parsedCondition = parseCondition(condition)
    const parsedActions = parseActions(actions)
    return {
      ...parsedCondition,
      actions: parsedActions,
    }
  })
  // const parsedConditions = parseCondition(conditions)
  // const parsedActions = parseActions(actions)

  // return parsedConditions.map((condition, index) => {
  //   return {
  //     ...condition,
  //     actions: parsedActions,
  //   }
  // })
}

const parseCondition = (condition) => {
  const { if: _condition, state, value } = condition
  const [page, section, field] = _condition.split('>')
  let pageName = '',
    sectionName = '',
    fieldName = ''
  if (page) {
    let [, name] = page.split(':')
    pageName = name.trim()
    if (section) {
      let [, name] = section.split(':')
      sectionName = name.trim()
    }
    if (field) {
      let [, name] = field.split(':')
      fieldName = name.trim()
    }
  }
  return {
    pageName,
    sectionName,
    fieldName,
    value,
    condition: state,
  }
}

const parseActions = (actions = []) => {
  return actions.map((_action) => {
    const { type, option, formMember, to } = _action
    const [page, section, field] = formMember.split('>')
    let pageName = '',
      sectionName = '',
      fieldName = ''
    if (page) {
      let [, name] = page.split(':')
      pageName = name.trim()
      if (section) {
        let [, name] = section.split(':')
        sectionName = name.trim()
      }
      if (field) {
        let [, name] = field.split(':')
        fieldName = name.trim()
      }
    }

    return {
      pageName,
      sectionName,
      fieldName,
      type,
      option,
      to,
    }
  })
}
// const parseCondition = (condition) => {
//   return condition.map((_res) => {
//     const { if: _condition, state, value } = _res
//     const [page, section, field] = _condition.split('>')
//     let pageName = '',
//       sectionName = '',
//       fieldName = ''
//     if (page) {
//       let [, name] = page.split(':')
//       pageName = name.trim()
//       if (section) {
//         let [, name] = section.split(':')
//         sectionName = name.trim()
//       }
//       if (field) {
//         let [, name] = field.split(':')
//         fieldName = name.trim()
//       }
//     }
//     return {
//       pageName,
//       sectionName,
//       fieldName,
//       value,
//       condition: state,
//     }
//   })
// }

// const parseActions = (actions) => {
//   return (actions[0] || []).map((_action) => {
//     const { type, option, formMember, to } = _action
//     const [page, section, field] = formMember.split('>')
//     let pageName = '',
//       sectionName = '',
//       fieldName = ''
//     if (page) {
//       let [, name] = page.split(':')
//       pageName = name.trim()
//       if (section) {
//         let [, name] = section.split(':')
//         sectionName = name.trim()
//       }
//       if (field) {
//         let [, name] = field.split(':')
//         fieldName = name.trim()
//       }
//     }

//     return {
//       pageName,
//       sectionName,
//       fieldName,
//       type,
//       option,
//       to,
//     }
//   })
// }

// const parsedBehaviorData = parseBehavior(behaviorData.data.behaviours)
// console.log(parsedBehaviorData)
