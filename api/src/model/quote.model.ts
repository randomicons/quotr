import mongoose, {Schema} from 'mongoose'

const QuoteSchema = new Schema({
  Quote: {type: 'String'},
  Popularity: {type: 'Number'},
  Author: {type: 'String'},
  Category: {type: 'String'},
  idx: {type: 'Number'}
}, { collection: 'quotes' })

export const QuotesModel = mongoose.model('quotes', QuoteSchema)


