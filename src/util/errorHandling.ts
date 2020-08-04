// centralized error object that derives from Node’s Error
import {HttpCode} from "../constants/httpCode"

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: number
  public readonly isOperational: boolean

  constructor(
    name: string,
    httpCode: HttpCode,
    description: string = "",
    isOperational: boolean = true
  ) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export function handleError(err: Error) {
  console.log("Values: " + JSON.stringify(err))
  console.log("Stack trace: \n" + err.stack)

  if (err instanceof AppError) {
    if (!err.isOperational) {
      process.exit(0)
    }
  }
  return err
  // await sendMailToAdminIfCritical();
  // await saveInOpsQueueIfCritical();
  // await determineIfOperationalError();
}

// export class ErrorHandler {
//     public async handleError(err: Error): Promise<void> {
//          console.log(err);
//         // await sendMailToAdminIfCritical();
//         // await saveInOpsQueueIfCritical();
//         // await determineIfOperationalError();
//     };
// }
//
