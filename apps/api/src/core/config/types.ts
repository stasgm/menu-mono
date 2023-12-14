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

// export type JwtAuthConfig = {
//   accessSecret?: string;
//   refreshSecret?: string;
//   expiresIn?: string;
// };

export type JwtAuthConfig = {
  // header: {
  //   typ: string;
  // };
  // audience: string;
  // issuer: string;
  // algorithm: string;
  expiresIn: string;
  accessSecret: string;
  refreshSecret: string;
};

export type AuthenticationConfig = {
  secret: string;
  strategies: string[];
  path: string;
  service: string;
  jwt: JwtAuthConfig;
  local: {
    entity: string;
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
