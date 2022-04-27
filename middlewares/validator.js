const { body, validationResult } = require('express-validator');


exports.RegisterValidation = [
    body('firstname','firstname must be not empty').notEmpty().trim(),
    body('lastname','lastname must be not empty').notEmpty().trim(),
    body('email','email must be email format').isEmail().normalizeEmail(),
    body('password','password must min 5 caracters').isLength({min:5})
]

exports.LoginValidation = [
  body('email','email must be email format').isEmail().normalizeEmail(),
  body('password','password must min 5 caracters').isLength({min:5})
]

exports.Validation = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}