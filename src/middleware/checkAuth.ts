import jwt = require("express-jwt")
import {Request} from "express"

const getTokenFromHeader = (req: Request) => {
  return req.cookies.token
}

export const checkAuth = jwt({
  secret: process.env.JWT_SECRET!, // The _secret_ to sign the JWTs
  getToken: getTokenFromHeader, // How to extract the JWT from the request
})
