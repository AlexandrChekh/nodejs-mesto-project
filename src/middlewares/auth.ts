import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../utils/constants';
import { SessionRequest } from '../types/request';

const extractBearerToken = (token: string) => {
  return token.replace('Bearer ', '');
};

const auth: RequestHandler = (req: SessionRequest, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch {
    throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
  }
  req.user = { _id: (payload as JwtPayload)._id };
  next();
};

export default auth;
