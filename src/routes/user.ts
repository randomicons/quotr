import {Request, Router} from "express"
import * as userService from "../services/user"
import {LOGIN_TOKEN} from "../constants"
import {AppError, handleError} from "../util/errorHandling"
import {HttpCode} from "../constants/httpCode"

export const routes = Router()

routes.post("/login", async (req: Request, res) => {
  try {
    const out = await userService.login(req.body.email, req.body.password)
    res.cookie(LOGIN_TOKEN, out.token, {maxAge: out.maxAge})
    res.send("Logged In")
  } catch (e) {
    handleError(e)
    if (e instanceof AppError)
      res.status(e.httpCode).send(e)
    else
      res.status(HttpCode.SERVER_ERROR).send(e)
  }
})

routes.post("/signup", async (req, res) => {
  try {
    //Todo verif all this is correct (use joi probably)
    const out = await userService.signup(
      req.body.username,
      req.body.email,
      req.body.password
    )
    res.cookie(LOGIN_TOKEN, out.token, {maxAge: out.maxAge})
    res.send("Logged In")
  } catch (e) {
    handleError(e)
    if (e instanceof AppError)
      res.status(e.httpCode).send(e)
    else
      res.status(HttpCode.SERVER_ERROR).send(e)
  }
})
