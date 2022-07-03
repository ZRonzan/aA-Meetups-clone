// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // const errors = validationErrors //code from original auth-me code. commented out due to below code creating an array of errors with the parameters for each field
    //   .array()
    //   .map((error) => `${error.msg}`);

    //create an array of all errors found in validation
    const errors = []
    validationErrors.errors.forEach(el => {
      let err = {}
      err[el.param] = el.msg;
      errors.push(err)
    });

    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation error';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
