import bodyParser from "body-parser"
import {Express, Router} from "express"
import logger from "morgan"
import cookieParser from "cookie-parser"
import {routes as quoteRoutes} from "./routes/quote"
import {routes as animeRoutes} from "./routes/anime"
import {handleError} from "./util/errorHandling"
import mongoose from 'mongoose'

import dotenv from "dotenv"

dotenv.config()
dotenv.config({path: `.env.${process.env.NODE_ENV}`})
const mongoDB = process.env.DB_URL!
mongoose.connect(mongoDB)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))


export default function (app: Express): void {
  const mainRoute = Router()
  app.use("/api", mainRoute)
  mainRoute.use(logger("dev"))
  mainRoute.use(bodyParser.json())
  mainRoute.use(cookieParser())
  mainRoute.use(bodyParser.urlencoded({extended: true}))
  // mainRoute.use(checkAuth)
  mainRoute.use("/quote", quoteRoutes)
  mainRoute.use("/anime", animeRoutes)
}

process.on("unhandledRejection", error => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  console.log("unhandled Rejection")
  throw error
})

process.on("uncaughtException", (error: Error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  handleError(error)
})

