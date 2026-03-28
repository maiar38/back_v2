const express = require("express")
const router  = express.Router()
const { getAll, getHotDeals, getOne, create, update, remove, uploadImage } = require("../controllers/product.controller")
const { protect, adminOnly } = require("../middleware/auth.middleware")
const { productRules, validate } = require("../middleware/validate.middleware")
const upload  = require("../middleware/upload.middleware")

// Static routes FIRST (before /:id)
router.get("/hot-deals", getHotDeals)

router.get("/",       getAll)
router.get("/:id",    getOne)
router.post("/",      protect, adminOnly, productRules, validate, create)
router.put("/:id",    protect, adminOnly, update)
router.delete("/:id", protect, adminOnly, remove)

// Phase 6 — image upload
router.post("/:id/upload-image", protect, adminOnly, upload.single("image"), uploadImage)

module.exports = router
