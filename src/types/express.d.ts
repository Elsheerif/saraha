import { JwtPayload } from '../services/token.service';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

