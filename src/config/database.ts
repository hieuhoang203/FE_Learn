// Database configuration
import { env } from './env';

export const dbConfig = {
  url: env.DATABASE_URL,
  // Add other database configuration options here
  options: {
    // Connection pool settings
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
};

// Database connection settings for different environments
export const getDbConfig = () => {
  switch (env.NODE_ENV) {
    case 'production':
      return {
        ...dbConfig,
        logging: false,
        pool: {
          max: 50,
          min: 10,
        },
      };
    case 'test':
      return {
        ...dbConfig,
        logging: false,
        pool: {
          max: 5,
          min: 1,
        },
      };
    default:
      return {
        ...dbConfig,
        logging: true,
      };
  }
};
