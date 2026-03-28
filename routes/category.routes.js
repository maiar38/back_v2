const express   = require("express")
const router    = express.Router()
const { getAll, getOne, create, update, remove } = require("../controllers/category.controller")
const { protect, adminOnly } = require("../middleware/auth.middleware")
const { categoryRules, validate } = require("../middleware/validate.middleware")

router.get("/",  getAll)
router.get("/:id", getOne)
router.post("/",  protect, adminOnly, categoryRules, validate, create)
router.put("/:id",  protect, adminOnly, update)
router.delete("/:id", protect, adminOnly, remove)

module.exports = router
