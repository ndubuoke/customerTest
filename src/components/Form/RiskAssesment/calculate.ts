const userAssessment = [
  {
    parameter: 'Is customer a Non-Resident?',
    parameterOption: 'Yes',
  },
  // {    //     parameter: "Status of customer identity verification",    //     parameterOption: "Failed"    // },    // {    //     parameter: "Status of customer address verification",    //     parameterOption: "Not verified"    // },
]
const standardRiskAssessmentData = [
  {
    parameter: 'Is customer a Non-Resident?',
    impliedWeight: 7,
    parameterOptions: ['Yes', 'No'],
    assessmentType: ['EDD Required', 'CDD'],
    escalationFactor: [2, 1],
    percentageOptionsWeightAllocation: [80, 20],
    score: [11.2, 1.4],
  },
  {
    parameter: 'Status of customer identity verification',
    impliedWeight: 10,
    parameterOptions: ['Passed', 'Failed', 'Not verified'],
    assessmentType: ['', 'EDD Required', 'Deal breaker'],
    escalationFactor: [1, 2, 3],
    percentageOptionsWeightAllocation: [0, 80, 100],
    score: [0, 16, 30],
  },
  {
    parameter: 'Status of customer address verification',
    impliedWeight: 10,
    parameterOptions: ['Passed', 'Failed', 'Not verified'],
    assessmentType: ['', 'EDD Required', 'Deal breaker'],
    escalationFactor: [1, 2, 3],
    percentageOptionsWeightAllocation: [0, 80, 100],
    score: [0, 16, 30],
  },
  {
    parameter: 'Status of customer livelihood verification',
    impliedWeight: 10,
    parameterOptions: ['Passed', 'Failed', 'Not verified'],
    assessmentType: ['', 'EDD Required', 'Deal Breaker'],
    escalationFactor: [1, 2, 3],
    percentageOptionsWeightAllocation: [0, 80, 100],
    score: [0, 16, 30],
  },
  {
    parameter: 'Is originating Country a FATF listed country?',
    impliedWeight: 7,
    parameterOptions: ['Yes', 'No'],
    assessmentType: ['EDD Required', 'CDD'],
    escalationFactor: [2, 1],
    percentageOptionsWeightAllocation: [100, 20],
    score: [14, 1.4],
  },
  {
    parameter: 'Is customer a Politically Exposed Person?',
    impliedWeight: 8,
    parameterOptions: ['Yes', 'No'],
    assessmentType: ['EDD Required', 'CDD'],
    escalationFactor: [2, 1],
    percentageOptionsWeightAllocation: [80, 20],
    score: [12.8, 1.6],
  },
  {
    parameter: 'Cross border banking relationship',
    impliedWeight: 6,
    parameterOptions: ['Yes', 'No'],
    assessmentType: ['EDD Required', 'CDD'],
    escalationFactor: [2, 1],
    percentageOptionsWeightAllocation: [80, 20],
    score: [9.6, 1.2],
  },
  {
    parameter: 'Is customer on any AML related sanction list?',
    impliedWeight: 10,
    parameterOptions: ['Yes', 'No'],
    assessmentType: ['Deal Breaker', ''],
    escalationFactor: [3, 1],
    percentageOptionsWeightAllocation: [100, 0],
    score: [30, 0],
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
  if (score < 20) scoreGuide = { score, rating: 'LOW', resolution: 'Do nothing' }
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
