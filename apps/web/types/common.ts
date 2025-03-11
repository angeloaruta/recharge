export type ErrorResponse = {
  message: string
  requestId: string
}

export type QueryResponse<T> = {
  data: T
  requestId: string
}

export type MutationResponse<T> = {
  data: T
  requestId: string
}
