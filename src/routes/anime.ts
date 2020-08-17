import {Request, Router} from "express"
import * as animeService from "../services/anime"
import {AppError, handleError} from "../util/errorHandling"
import {HttpCode} from "../constants/httpCode"

export const routes = Router()
routes.get("/:day", async (req: Request, res) => {
  try {
    res.json(await animeService.getQuote(req.params.day))
  } catch (e) {
    handleError(e)
    if (e instanceof AppError)
      res.status(e.httpCode).send(e)
    else
      res.status(HttpCode.SERVER_ERROR).send(e)
  }
})
