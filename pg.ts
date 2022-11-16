// [
//   "surname",
//   "firstName",
//   "otherNames",
//   "gender",
//   "dob",
//   "nationality",
//   "soo",
//   "idType",
//   "id",
//   "residentialAddress",
//   "country",
//   "state",
//   "city_town",
//   "lga",
//   "mobileNumber",
//   "status",
//   "statusDescription",
//   "generatedId",
// ]


// (async () => {
//   const rows = await readXlsxFile(file)

//   const details = rows.slice(1)
//   const customerValidation = []
//   details.forEach((det) => {
//     customerValidation.push({
//       surname: det[0],
//       firstName: det[1],
//       otherNames: det[2],
//       gender: det[3],
//       dob: det[4],
//       nationality: det[5],
//       soo: det[6],
//       idType: det[7],
//       id: det[8],
//       residentialAddress: det[9],
//       country: det[10],
//       state: det[11],
//       city_town: det[12],
//       lga: det[13],
//       mobileNumber: det[14],
//       status: Number((det[8]).toString()[0]) !== 8 ? 0 : 1,
//       statusDescription: Number((det[8]).toString()[0]) !== 8 ? `Provided ID not Found in ${det[7]} Database` : `n/a`,
//     })
//   })
//   setUploadedFile(customerValidation)
//   setRecords(customerValidation)

//   setFailedValidation(customerValidation.filter((customer) => customer.status === 0).filter(Boolean).length)
//   setSuccessfulValidation(customerValidation.filter((customer) => customer.status === 1).filter(Boolean).length)
// })();