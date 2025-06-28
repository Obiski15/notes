import config from "../../config"
import { IError } from "../../types"
import sendResponse from "./sendResponse"

function handleDevError(error: IError) {
  const status = error.status ?? "error"
  const statusCode = error.statusCode ?? 500

  return sendResponse({
    status,
    statusCode,
    error: {
      status: statusCode,
      message: error.message,
      stack: error.stack,
    },
  })
}

function handleProdError(error: IError) {
  const status = error.status ?? "error"
  const statusCode = error.statusCode ?? 500

  return sendResponse({
    status,
    statusCode,
    error: {
      status: statusCode,
      message: error.isOperational ? error.message : "Something went wrong...",
    },
  })
}

const errorHandler = (error: IError) => {
  if (config.nodeEnv === "development") return handleDevError(error)

  if (config.nodeEnv === "production") return handleProdError(error)
}

export default errorHandler
