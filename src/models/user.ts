import {
  Schema,
  model,
  Model,
  Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import {
  URL_REGEX,
  INVALID_URL_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE
} from '../utils/constants';
import UnauthorizedError from '../errors/unauthorized-error';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}

const sanitizeUser = (ret: Record<string, unknown>) => {
  const user = { ...ret };
  delete user.password;
  return user;
};

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v: string) => !v || URL_REGEX.test(v),
      message: INVALID_URL_MESSAGE
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: INVALID_EMAIL_MESSAGE
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.set('toJSON', {
  transform: (_doc, ret) => sanitizeUser(ret)
});

userSchema.set('toObject', {
  transform: (_doc, ret) => sanitizeUser(ret)
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
        }
        return user;
      });
    });
};

export default model<IUser, UserModel>('user', userSchema);
