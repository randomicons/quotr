import bodyParser from "body-parser"
import {Express, Router} from "express"
import logger from "morgan"
import cookieParser from "cookie-parser"
import {routes} from "./routes/user"
import {routes as quoteRoutes} from "./routes/quote"
import {handleError} from "./util/errorHandling"
import Knex from "knex"
import UserModel from "./model/user"

import dotenv from "dotenv"

dotenv.config()
dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const knexConfig = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "joustr",
  },
}

export default function(app: Express): void {
  const mainRoute = Router()
  app.use("/api", mainRoute)
  mainRoute.use(logger("dev"))
  mainRoute.use(bodyParser.json())
  mainRoute.use(cookieParser())
  mainRoute.use(bodyParser.urlencoded({extended: true}))
  // mainRoute.use(checkAuth)
  mainRoute.use("/user", routes)
  mainRoute.use("/quote", quoteRoutes)
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

// Models
// console.log(process.env)
export const knex = Knex(knexConfig)
export const userModel = new UserModel(knex)
