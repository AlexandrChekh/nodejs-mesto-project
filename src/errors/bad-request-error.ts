import { BAD_REQUEST } from '../utils/constants';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

export default BadRequestError;
