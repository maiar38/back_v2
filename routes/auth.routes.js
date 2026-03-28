const express = require("express")
const router  = express.Router()
const { register, login } = require("../controllers/auth.controller")
const { registerRules, loginRules, validate } = require("../middleware/validate.middleware")

// POST /api/auth/register
router.post("/register", registerRules, validate, register)

// POST /api/auth/login
router.post("/login", loginRules, validate, login)

module.exports = router
