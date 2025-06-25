import logger from "@/lib/logger"

import config from "../../config"
import { IError } from "../../types"
import sendResponse from "./sendResponse"

function handleDevError(error: IError) {
  logger.info(error)
  const status = error.status ?? "error"
  const statusCode = error.statusCode ?? 500

  return sendResponse({ status, statusCode })
}

function handleProdError(error: IError) {
  const status = error.status ?? "error"
  const statusCode = error.statusCode ?? 500

  return sendResponse({ status, statusCode })
}

const errorHandler = (error: IError) => {
  if (config.nodeEnv === "development") return handleDevError(error)

  if (config.nodeEnv === "production") return handleProdError(error)
}

export default errorHandler
