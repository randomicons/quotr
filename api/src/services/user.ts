import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {AppError} from "../util/errorHandling"
import {HttpCode} from "../constants/httpCode"
import {userModel} from "../loader"
import {dbErrorCodes} from "../constants/dbErrorCodes"
import {User} from "../types"

const saltRounds = 10

const genToken = (userInfo: User) => {
  const options = {expiresIn: 60 * 60 * 24 * 3}
  const {password, ...payload} = userInfo
  return {
    token: jwt.sign(payload, process.env.JWT_SECRET!, options),
    maxAge: options.expiresIn,
  }
}

export const login = async (email: string, password: string) => {
  let userInfo
  try {
    userInfo = await userModel.login(email)
  } catch (e) {
    throw new AppError("db error", HttpCode.BAD_REQUEST, e.stack)
  }

  if (!userInfo) throw new AppError("Password incorrect", HttpCode.UNAUTHORIZED)
  const match = await bcrypt.compare(password, userInfo.password)
  if (!match) {
    throw new AppError("Password incorrect", HttpCode.UNAUTHORIZED)
  }
  return genToken(userInfo)
}

export const signup = async (userName: string, email: string, password: string) => {
  try {
    const userid = await userModel.signup(
      userName,
      email,
      await bcrypt.hash(password, saltRounds)
    )
    return genToken({name: userName, email, password, userid: userid[0]})
  } catch (e) {
    if (e.code === dbErrorCodes.uniqueViolation)
      throw new AppError("user already exists", HttpCode.BAD_REQUEST)
    else throw new AppError("DB error", HttpCode.BAD_REQUEST, e.stack)
  }
}
