import {AppError} from "../util/errorHandling"
import {HttpCode} from "../constants/httpCode"
import {AnimeModel} from "../model/anime.model";


export const getQuote = async (idx: string) => {
  try {
      const quote: any = await AnimeModel.findOne({idx}).exec()
      if (!quote)
        throw new AppError("quote not found" + "rand:" + idx, HttpCode.BAD_REQUEST)
      return quote
  } catch (e) {
    console.log(e)
  }
}

