const express  = require("express")
const cors     = require("cors")
const morgan   = require("morgan")
require("dotenv").config()

const connectDB     = require("./config/db")
const logger        = require("./middleware/logger.middleware")
const errorHandler  = require("./middleware/error.middleware")

const app = express()

// ── Phase 5: Middleware ─────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))

// Phase 8: Morgan (HTTP logging) + custom logger
app.use(morgan("dev"))
app.use(logger)

// ── Phase 2: Routes ─────────────────────────────────────────────────────────
app.use("/api/auth",       require("./routes/auth.routes"))
app.use("/api/categories", require("./routes/category.routes"))
app.use("/api/products",   require("./routes/product.routes"))
app.use("/api/users",      require("./routes/user.routes"))

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

// ── Phase 8: Global Error Handler ───────────────────────────────────────────
app.use(errorHandler)

// ── Phase 1: DB + Server ────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on http://localhost:${process.env.PORT || 5000}`)
  )
})
