import { User } from './user';

declare module 'fastify' {
  export interface FastifyRequest {
    user?: User;
    res: FastifyReply;
  }

  export interface FastifyReply {
    startTime: number;
    setHeader: (key: string, value: string) => unknown;
    end: () => void;
  }
}
