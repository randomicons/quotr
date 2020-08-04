import {AppError} from "../util/errorHandling"
import {HttpCode} from "../constants/httpCode"
import quotes from "../quotes.json"
import seedrandom from 'seedrandom'

export const getQuote = () => {
  const qts = quotes as any
  try {
    const rand = seedrandom(Date.now().toString())
    if (rand() < .5)
      return {quote: "senpai put your dick in my asshole", author: "michael the baptist"}
    else {
      const idx = Math.trunc(Math.random() * qts.length)
      const quote = qts[idx]
      quote.Author = quote.Author.split(",")[0]
      return quote
    }
  } catch (e) {
    throw new AppError("SQL Error", HttpCode.BAD_REQUEST, e.stackTrace())
  }
}

