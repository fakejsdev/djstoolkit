declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_HOSTNAME?: string;
      REDIS_PORT?: string;
    }
  }
}

export {};
