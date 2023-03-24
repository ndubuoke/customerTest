const path = require('path')

module.exports = {
  //Root of the application
  root: path.normalize(path.resolve('./')),

  // Source files
  src: path.normalize(path.resolve(__dirname, './src')),
}

// make dropdown searchable
// expiry date should be later than today.
// remove date in success modal while creating add on forms.
// return to dashboard should return to the initial dashboard.
