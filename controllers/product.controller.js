const Product = require("../models/product.model")

// GET /api/products  — ?category_id= &search= &on_sale= &hot_deal= &page= &limit=
const getAll = async (req, res, next) => {
  try {
    const { category_id, search, on_sale, hot_deal, page = 1, limit = 12 } = req.query
    const filter = {}

    if (category_id) filter.category_id = category_id
    if (on_sale)     filter.on_sale     = on_sale === "true"
    if (hot_deal)    filter.is_hot_deal = hot_deal === "true"
    if (search)      filter.name        = { $regex: search, $options: "i" }

    const total    = await Product.countDocuments(filter)
    const products = await Product.find(filter)
      .populate("categoryId", "name slug")
      .populate("createdBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    res.json({ total, page: Number(page), pages: Math.ceil(total / limit), products })
  } catch (err) {
    next(err)
  }
}

// GET /api/products/hot-deals
const getHotDeals = async (req, res, next) => {
  try {
    const products = await Product.find({ is_hot_deal: true })
      .populate("categoryId", "name slug")
    res.json(products)
  } catch (err) {
    next(err)
  }
}

// GET /api/products/:id
const getOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categoryId", "name slug")
      .populate("createdBy", "name email")
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

// POST /api/products
const create = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      price:    req.body.price || req.body.regular_price,
      createdBy: req.user._id,
    })
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

// PUT /api/products/:id
const update = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/products/:id
const remove = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product deleted successfully" })
  } catch (err) {
    next(err)
  }
}

// POST /api/products/:id/upload-image
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" })

    const imageUrl = `/uploads/${req.file.filename}`
    const product  = await Product.findByIdAndUpdate(
      req.params.id,
      { image: imageUrl, thumbnail: imageUrl },
      { new: true }
    )
    if (!product) return res.status(404).json({ message: "Product not found" })

    res.json({ message: "Image uploaded successfully", image: imageUrl, product })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getHotDeals, getOne, create, update, remove, uploadImage }
