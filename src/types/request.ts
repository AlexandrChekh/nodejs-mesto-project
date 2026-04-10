import { Request } from 'express';

interface UserData {
  _id: string;
}

export interface SessionRequest extends Request {
  user?: UserData;
}
