const mongoose = require("mongoose")
const bcrypt   = require("bcryptjs")
require("dotenv").config()

const Product  = require("./models/product.model")
const Category = require("./models/category.model")
const User     = require("./models/user.model")
const data     = require("./shopery-clean-db.json")

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("DB Connected")

  await Product.deleteMany()
  await Category.deleteMany()
  await User.deleteMany()
  console.log("Old data cleared")

  // insert categories first — capture inserted docs to get real _id values
  const insertedCategories = await Category.insertMany(
    data.categories.map(c => ({
      name:  c.name,
      slug:  c.slug,
      image: c.image,
      description: c.description || "",
    }))
  )
  console.log(` ${insertedCategories.length} categories inserted`)

  // build slug → _id map for product categoryId population
  const catMap = {}
  insertedCategories.forEach(c => { catMap[c.slug] = c._id })

  // create admin first so createdBy is available
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await User.create({
    name:     "Admin",
    email:    "admin@shopery.com",
    password: adminPassword,
    role:     "admin",
    avatar:   "https://shopery.netlify.app/main/src/images/user/img-01.png",
  })
  console.log("Admin created  →  admin@shopery.com / admin123")

  await Product.insertMany(
    data.products.map(p => ({
      ...p,
      price:      p.regular_price,
      image:      p.thumbnail,
      categoryId: catMap[p.category_id] || null,
      createdBy:  admin._id,
    }))
  )
  console.log(` ${data.products.length} products inserted`)

  console.log("Seeding complete!")
  process.exit()
}).catch(err => {
  console.error("Error:", err)
  process.exit(1)
})
