const express = require('express')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoute.js') 
const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3003
const localhost = process.env.LOCALHOST

//connection db
connectDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//router
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes);

//rest API
app.get('/', (req, res)=>{
    res.send('hello cac ban')
})



app.listen(port, localhost,()=>{
    console.log(`Server started at http://${localhost}:${port}`);
    
})