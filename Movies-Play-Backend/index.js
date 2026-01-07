const express = require('express')
const dotenv = require('dotenv')
const route = require('./routes/routes')
const cors = require('cors')
const app = express()

dotenv.config()

const PORT = process.env.PORT || 4000

app.use(cors());

app.use(express.json())
app.use("/api",route)

app.get("/",(req,res)=>{
    return res.json({msg:"server is Running.."})
})

app.listen(PORT,()=>{
    console.log(`Server is Running on PORT :${PORT}`)
})
