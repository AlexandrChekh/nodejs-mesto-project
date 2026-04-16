const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

if (NODE_ENV === 'production' && !MONGO_URL) {
  throw new Error('MONGO_URL must be set in production');
}

const jwtSecret = NODE_ENV === 'production'
  ? (JWT_SECRET as string)
  : JWT_SECRET || 'dev-secret';

const mongoUrl = NODE_ENV === 'production'
  ? (MONGO_URL as string)
  : MONGO_URL || 'mongodb://localhost:27017/mestodb';

export { mongoUrl };
export default jwtSecret;
