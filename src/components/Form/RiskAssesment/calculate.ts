const userAssessment = [
  {
    parameter: 'Is Customer a Non-Resident?',
    parameterOption: 'Yes',
  },
  // {    //     parameter: "Status of customer identity verification",    //     parameterOption: "Failed"    // },    // {    //     parameter: "Status of customer address verification",    //     parameterOption: "Not verified"    // },
]
const standardRiskAssessmentData = [
  {
    parameter: 'Is Customer a Non-Resident?',
    impliedWeight: 7,
    parameterOptions: ['Yes', 'No', 'Not verified'],
    assessmentType: ['EDD Required', 'CDD', 'Deal breaker'],
    escalationFactor: [2, 1, 1],
    percentageOptionsWeightAllocation: [80, 20, 100],
    score: [11.2, 1.4, 7],
  },
  {
    parameter: 'Status of Customer identity verification',
    impliedWeight: 10,
    parameterOptions: ['Passed', 'Failed', 'Not verified'],
    assessmentType: ['', 'EDD Required', 'Deal breaker'],
    escalationFactor: [1, 2, 3],
    percentageOptionsWeightAllocation: [0, 80, 100],
    score: [0, 16, 30],
  },
  {
    parameter: 'Status of Customer address verification',
    impliedWeight: 10,
    parameterOptions: ['Passed', 'Failed', 'Not verified'],
    assessmentType: ['', 'EDD Required', 'Deal breaker'],
    escalationFactor: [1, 2, 3],
    percentageOptionsWeightAllocation: [0, 80, 100],
    score: [0, 16, 30],
  },
  {
    parameter: 'Status of Border Banking relationship',
    impliedWeight: 6,
    parameterOptions: ['Yes', 'No', 'Not verified'],
    assessmentType: ['EDD Required', 'CDD', 'Deal Breaker'],
    escalationFactor: [2, 1, 1],
    percentageOptionsWeightAllocation: [80, 20, 100],
    score: [9.6, 1.2, 6],
  },
  {
    parameter: 'Status of Customer livelihood verification',
    impliedWeight: 10,
    parameterOptions: ['Passed', 'Failed', 'Not verified'],
    assessmentType: ['', 'EDD Required', 'Deal Breaker'],
    escalationFactor: [1, 2, 3],
    percentageOptionsWeightAllocation: [0, 80, 100],
    score: [0, 16, 30],
  },
  {
    parameter: 'Is Originating Country a FATF listed country?',
    impliedWeight: 7,
    parameterOptions: ['Yes', 'No', 'Not verified'],
    assessmentType: ['EDD Required', 'CDD', 'CDD'],
    escalationFactor: [2, 1, 1],
    percentageOptionsWeightAllocation: [10, 90, 100],
    score: [14, 1.4, 7],
  },
  {
    parameter: 'Is Customer a Politically Exposed Person?',
    impliedWeight: 8,
    parameterOptions: ['Yes', 'No', 'Not verified'],
    assessmentType: ['EDD Required', 'CDD', ''],
    escalationFactor: [2, 1, 1],
    percentageOptionsWeightAllocation: [80, 20, 100],
    score: [12.8, 1.6, 8],
  },
  {
    parameter: 'Cross border banking relationship',
    impliedWeight: 6,
    parameterOptions: ['Yes', 'No', 'Not verified'],
    assessmentType: ['EDD Required', 'CDD', 'Deal breaker'],
    escalationFactor: [2, 1, 1],
    percentageOptionsWeightAllocation: [80, 20, 100],
    score: [9.6, 1.2, 6],
  },
  {
    parameter: 'Is Customer on any AML related sanction list?',
    impliedWeight: 10,
    parameterOptions: ['Yes', 'No', 'Not verified'],
    assessmentType: ['Deal Breaker', 'CDD', ''],
    escalationFactor: [3, 1, 1],
    percentageOptionsWeightAllocation: [100, 0, 100],
    score: [30, 0, 10],
  },
  {
    parameter: 'Customer Persona',
    impliedWeight: 5,
    parameterOptions: ['High net worth', 'Upper Middle Class', 'Middle Class', 'Floating Middle Class', 'Low Income', 'Not verified'],
    assessmentType: ['EDD Required', 'CDD', 'CDD', 'CDD', 'CDD', 'Deal Breaker'],
    escalationFactor: [1, 1, 1, 1, 1, 1],
    percentageOptionsWeightAllocation: [60, 40, 20, 10, 0, 100],
    score: [3, 2, 1, 0.5, 0, 5],
  },
]
const riskAssessmentScore = (assessmentArray) => {
  return assessmentArray.map((_assessment, index) => {
    const { impliedWeight, escalationFactor, percentageOptionsWeightAllocation, assessmentType } = _assessment
    const scoreArr = escalationFactor.map((value, index) => {
      return (value * percentageOptionsWeightAllocation[index] * impliedWeight) / 100
    })
    return {
      ..._assessment,
      assessment: assessmentType[index],
      score: scoreArr,
    }
  })
}
export const calcScore = (arr) => {
  let scoreGuide = null
  const assessmentscoreGuide = riskAssessmentScore(standardRiskAssessmentData)
  const output = assessmentscoreGuide
    .map((assessment) => {
      return arr.map((sentAssessment) => {
        if (sentAssessment.parameter === assessment.parameter) {
          const ansIndex = assessment?.parameterOptions?.findIndex((el) => {
            return el === sentAssessment.parameterOption
          })
          return {
            ...sentAssessment,
            impliedWeight: assessment.impliedWeight,
            assessmentType: assessment.assessmentType[ansIndex],
            score: assessment.score[ansIndex],
          }
        }
      })
    })
    .flat()
    .filter((res) => res !== undefined)
  const score = output.reduce((acc, res) => {
    return (acc += res.score)
  }, 0)
  if (score < 20) scoreGuide = { score, rating: 'LOW', resolution: '' }
  else if (score >= 20 && score <= 60)
    scoreGuide = { score, rating: 'MEDIUM', resolution: 'Enhanced Due Diligence will be initiated to complete profile creation.' }
  else if (score > 60) scoreGuide = { score, rating: 'HIGH', resolution: 'Enhanced Due Diligence will be initiated to complete profile creation.' }
  output.map((res) => {
    if (res.assessmentType === 'Deal breaker')
      scoreGuide = { score, rating: 'HIGH', resolution: 'Enhanced Due Diligence will be initiated to complete profile creation.' }
    else if (res.assessmentType === 'EDD required' && res.assessmentType !== 'Deal breaker')
      scoreGuide = { score, rating: 'MEDIUM', resolution: 'Trigger EDD' }
  })
  return {
    output,
    scoreGuide,
  }
}
const outputData = calcScore(userAssessment)
console.log(outputData)
