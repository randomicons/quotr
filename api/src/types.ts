import {Request as EReq} from 'express'

export type Request<Body> = EReq<any, any, Body, any>
export interface CreateItem {
  name: string
  url: string
}

export interface CreateTourn {
  name: string
  creatorid: string
}

export interface Tourn {
  tournid: string
  name: string
  creatorid: string
}

export interface User {
  userid: string
  email: string
  name: string
  password: string
}

export interface Item {
  itemid: string
  name: string
  url: string
}

export interface ItemTournPair {
  itemid: string
  tournid: string
  points: number
}

export interface TournWithItems {
  tourn: Tourn
  items: Item[]
}

export type TournLeaderboard = (ItemTournPair & Item)[]
