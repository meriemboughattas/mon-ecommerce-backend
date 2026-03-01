const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 5000 
const connectdb = require("./config/connectdb")
const cors = require("cors")


connectdb()

app.use(express.json())
app.use(cors())

const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes")

app.use("/api/users", userRoutes)          
app.use("/api/categories", categoryRoutes) 
app.use("/api/products", productRoutes)    
app.use("/api/orders", orderRoutes)        
app.use("/api/payments", paymentRoutes)    

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`)
})