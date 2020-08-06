import {AppError} from "../util/errorHandling"
import {HttpCode} from "../constants/httpCode"
import {QuotesModel} from "../model/quote.model";


export const getQuote = async (idx: string) => {
  try {
    if (idx === '696969')
      return {
        quote: "senpai put your dick in my asshole",
        author: "michael the baptist"
      }
    else {
      const quote: any = await QuotesModel.findOne({idx}).exec()
      if (!quote)
        throw new AppError("quote not found" + "rand:" + idx, HttpCode.BAD_REQUEST)
      return quote
    }
  } catch (e) {
    console.log(e)
  }
}

