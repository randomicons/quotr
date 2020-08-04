import Knex from "knex"

export default class Model {
  constructor(protected knex: Knex) {
    this.knex = knex
  }
}
