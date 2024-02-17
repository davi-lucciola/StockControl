import { AxiosError } from "axios";
import { HttpError, HttpWarning } from "../domain/errors/HttpError";

export const HTTP_STATUS = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

class Response {
  detail: string;
  public constructor(detail: string) {
    this.detail = detail;
  }
}

export class SuccessResponse extends Response {
  createdId;
  public constructor(detail: string, createdId: number) {
    super(detail);
    this.createdId = createdId;
  }
}

export class ErrorResponse extends Response {}

export const getHttpError = (error: AxiosError<ErrorResponse>) => {
  console.log(error.response!.status);
  if (error.response!.status < HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    throw new HttpWarning(error.response?.data.detail);
  } else if (error.response!.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    throw new HttpError(error.response?.data.detail);
  } else {
    throw new HttpError("Houve um erro ao realizar a sua solicitação.");
  }
};
