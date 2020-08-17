import mongoose, {Schema} from 'mongoose'

const AnimeSchema = new Schema({
  Quote: {type: 'String'},
  Author: {type: 'String'},
  Summary: {type: 'String'},
  idx: {type: 'Number'}
}, { collection: 'animeQuotes' })

export const AnimeModel = mongoose.model('animeQuotes', AnimeSchema)


