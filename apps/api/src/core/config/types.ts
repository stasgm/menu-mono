export type PostgresConfig = {
  host: string;
  port: number;
  dbname: string;
  user?: string;
  password?: string;
  dbConnectionMaxAttempts?: number;
};

export type RedisConfig = {
  host: string;
  port: number;
};

export type JwtAuthConfig = {
  accessSecret?: string;
  accessExpiresIn?: string;
  refreshSecret?: string;
  refreshExpiresIn?: string;
};

export type AuthenticationConfig = {
  strategies: string[];
  jwt?: JwtAuthConfig;
  local?: {
    usernameField: string;
    passwordField: string;
  };
};

export interface IAppConfig {
  envPrefix: string;
  nestPort: number;
  postgres?: PostgresConfig;
  redis?: RedisConfig;
  secuirity?: AuthenticationConfig;
}
