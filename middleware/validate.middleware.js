const { body, validationResult } = require("express-validator")

// Run validation and return errors if any
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Validation rules — Register
const registerRules = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]

// Validation rules — Login
const loginRules = [
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
]

// Validation rules — Product
const productRules = [
  body("name").notEmpty().withMessage("Product name is required").trim(),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("regular_price").isFloat({ min: 0 }).withMessage("Regular price must be a positive number"),
]

// Validation rules — Category
const categoryRules = [
  body("name").notEmpty().withMessage("Category name is required").trim(),
  body("slug").notEmpty().withMessage("Slug is required").trim(),
]

module.exports = { validate, registerRules, loginRules, productRules, categoryRules }
