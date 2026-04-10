import { ErrorRequestHandler } from 'express';

import {
  DEFAULT_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR
} from '../utils/constants';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR ? DEFAULT_ERROR_MESSAGE : message
  });
};

export default errorHandler;
