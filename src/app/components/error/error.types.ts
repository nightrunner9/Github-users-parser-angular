export interface IError {
  status: number,
  message: string,
}

export type IErrorType = IError | null