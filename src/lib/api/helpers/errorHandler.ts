import { NextRequest } from "next/server"
import config from "@/config"

import { IError } from "../types"
import AppError from "../utils/AppError"
import sendResponse from "./sendResponse"

function handleCastError(error: IError) {
  return new AppError(
    `Invalid id: ${error.value}. Please check your request and try again`,
    400
  )
}

function handleExpiredJwt() {
  return new AppError("Auth token expired", 401)
}

function handleInvalidJwt() {
  return new AppError("Invalid auth token", 401)
}

function handleDuplicateField(request: NextRequest, error: IError) {
  const keyValue = error.keyValue

  if (request.nextUrl.pathname.includes("/api/folder"))
    return new AppError(
      `A folder with the name "${(keyValue as { name: string }).name}" already exists`,
      400
    )

  if (request.nextUrl.pathname.includes("/api/note"))
    return new AppError(
      `A Note with the name "${(keyValue as { title: string }).title}" already exists`,
      400
    )

  return new AppError("A record with these details already exists", 400)
}

function handleValidationError(error: IError) {
  const validationErrors = Object.values(
    error.errors as Record<string, { message: string; [key: string]: string }>
  )
    .map(e => e.message)
    .join(", ")

  return new AppError(validationErrors, 400)
}

function handleDevError(error: IError) {
  const status = error.status ?? "error"
  const statusCode = error.statusCode ?? 500

  console.log(error)

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

const errorHandler = (error: IError, request: NextRequest) => {
  let err = { ...error, name: error.name, message: error.message } as IError

  if (error.code === "ERR_JWT_EXPIRED") err = handleExpiredJwt()

  if (
    error.name === "JWSInvalid" ||
    error.name === "JWSSignatureVerificationFailed"
  )
    err = handleInvalidJwt()

  if (error.name === "CastError") err = handleCastError(error)

  if (error.name === "ValidationError") err = handleValidationError(error)

  if (error.code === 11000) err = handleDuplicateField(request, error)

  if (config.nodeEnv === "development") return handleDevError(err)

  if (config.nodeEnv === "production") return handleProdError(err)
}

export default errorHandler
