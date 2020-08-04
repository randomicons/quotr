import Model from "./model"
import {db} from "../constants"
import {User} from "../types"

export default class UserModel extends Model {
  signup(name: string, email: string, password: string) {
    return this.knex(db.tables.users).insert({
      name,
      email,
      password
    }).returning("userid")
  }

  login(email: string) {
    return this.knex<User>(db.tables.users).where("email", email).first()
  }
}
