import { AuthPayload } from 'types/jwt';
import * as jwt from 'jsonwebtoken';

export function signToken(
  payload: AuthPayload,
  secret: string,
  timeout: string,
): string {
  const options: jwt.SignOptions = { expiresIn: timeout };
  return jwt.sign(payload, secret, options);
}

export function verifyToken<T>(token: string, secret: string): T | null {
  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (err) {
    return null;
  }
}
