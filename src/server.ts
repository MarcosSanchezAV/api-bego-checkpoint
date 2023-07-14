import "dotenv/config"
import express from "express"
import dbConnect from "./config/mongo"
import e from "express"
import { router } from "./routes/points.router"

const app = express() 
const port = process.env.PORT

app.use(router)
dbConnect().then(() => console.log('Connection to mongoDB succesful')).catch(error => console.log('Error with mongoDB connection: ', e))
app.listen(port, () => console.log(`Server is running in port: ${port}`))
