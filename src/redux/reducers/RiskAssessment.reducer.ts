import { UPDATE_RISK_ASSESSMENT, UPDATE_PARAMETER_OPTION, COMPUTE_ASSESSMENT } from 'Redux/constants/RiskAssessment.constant'

export type riskAssessmentType = {
  riskAssessmentData?: any
  riskScoreGuide?: {
    score: number
    rating: string
    resolution: string
  }
}

export const initialStateRequest = {
  riskAssessmentData: {
    'bio-Data': {
      title: "Customer's Identity",
      standardRiskAssessmentData: [
        {
          parameter: 'Status of customer identity verification',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Not verified',
              weight: 100,
            },
            {
              status: 'Failed',
              weight: 80,
            },
            {
              status: 'Passed',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
        {
          parameter: 'Is Customer a Politically Exposed Person?',
          impliedWeight: 8,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
            {
              status: 'Not verified',
              weight: 100,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
      ],
      fields: [
        {
          title: "Customer's Name",
          key: 'surname',
        },
        {
          title: 'Gender',
          key: 'gender',
        },
        {
          title: 'Date of Birth',
          key: 'dateOfBirth',
        },
        {
          title: 'Marital Status',
          key: 'maritalStatus',
        },
        {
          title: 'Origin',
          key: 'stateOfOrigin',
        },
        {
          title: 'ID Document [ID Number]',
          key: 'iDNumber',
        },
      ],
      isCompleted: null,
    },
    contactInformation: {
      title: "Customer's Address",
      standardRiskAssessmentData: [
        {
          parameter: 'Is Customer a Non-Resident?',
          impliedWeight: 7,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
            {
              status: 'Not verified',
              weight: 100,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
        {
          parameter: 'Status of customer address verification',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Not verified',
              weight: 100,
            },
            {
              status: 'Failed',
              weight: 80,
            },
            {
              status: 'Passed',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
      ],
      fields: [
        {
          title: 'Residential Address',
          key: 'residentialAddress',
        },
        {
          title: 'Mobile Number',
          key: 'mobileNumber',
        },
        {
          title: 'Email Address',
          key: 'emailAddress',
        },
      ],
      isCompleted: null,
    },
    employmentDetails: {
      title: "Customer's Livelihood",
      standardRiskAssessmentData: [
        {
          parameter: 'Status of Customer livelihood verification',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Not verified',
              weight: 100,
            },
            {
              status: 'Failed',
              weight: 80,
            },
            {
              status: 'Passed',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
        {
          parameter: 'Status of Cross border banking relationship',
          impliedWeight: 6,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
            {
              status: 'Not verified',
              weight: 100,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
      ],
      fields: [
        {
          title: 'Employment Status',
          key: 'employmentStatus',
        },
        {
          title: 'Date of Employment',
          key: 'dateOfEmployment',
        },
        {
          title: 'Nature of Business/Occupation',
          key: 'natureOfBusinessOccupation',
        },
        {
          title: 'Annual Salary/Expected Annual Income',
          key: 'annualSalaryExpectedAnnualIncome',
        },
        {
          title: 'Employer’s Name',
          key: 'employersName',
        },
        {
          title: 'Employer’s Address',
          key: 'employersAddress',
        },
        {
          title: 'Employer’s Mobile Number',
          key: 'employersMobileNumber',
        },
        {
          title: 'Employer’s Email Address',
          key: 'employersEmailAddress',
        },
      ],
      isCompleted: null,
    },
    watchlist: {
      title: 'Watchlist',
      standardRiskAssessmentData: [
        {
          parameter: 'Is originating Country a FATF listed country?',
          impliedWeight: 7,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 100,
            },
            {
              status: 'No',
              weight: 20,
            },
            {
              status: 'Not verified',
              weight: 100,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
        {
          parameter: 'Is Customer on any AML related sanction list?',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 100,
            },
            {
              status: 'No',
              weight: 0,
            },
            {
              status: 'Not verified',
              weight: 100,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },

        {
          parameter: 'Customer Persona',
          impliedWeight: 5,
          parameterOptions: [
            {
              status: 'High net worth',
              weight: 60,
            },
            {
              status: 'Upper Middle Class',
              weight: 40,
            },
            {
              status: 'Middle Class',
              weight: 20,
            },
            {
              status: 'Floating Middle Class',
              weight: 10,
            },
            {
              status: 'Low Income',
              weight: 0,
            },
            {
              status: 'Not verified',
              weight: 100,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
      ],
      fields: [],
      isCompleted: null,
    },
  },
  riskScoreGuide: null,
}

export const riskAssessmentReducer = (state: riskAssessmentType = initialStateRequest, action: { type: string; payload: riskAssessmentType }) => {
  switch (action.type) {
    case UPDATE_RISK_ASSESSMENT:
      return { ...state, ...action.payload }
    case UPDATE_PARAMETER_OPTION:
      return { ...state, ...action.payload }
    case COMPUTE_ASSESSMENT:
      return { ...action.payload }
    default:
      return state
  }
}
