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
  access: {
    secret?: string;
    expiresIn: string;
  };
  refresh: {
    secret?: string;
    expiresIn: string;
  };
  activate: {
    secret?: string;
    expiresIn?: string;
  };
  resetPass: {
    secret?: string;
    expiresIn: string;
  };
};

export type AuthenticationConfig = {
  strategies: string[];
  jwt?: JwtAuthConfig;
  local?: {
    usernameField: string;
    passwordField: string;
  };
};

export type GoogleApiConfig = {
  apiEmail: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export type MailConfig = {
  mockMailing?: boolean;
  googleApi?: GoogleApiConfig;
};

export type AccountConfig = {
  codeAcivationMaxNumberOfAttempts?: number;
};

export interface IAppConfig {
  envPrefix: string;
  frontendUrl?: string;
  nestPort: number;
  postgres?: PostgresConfig;
  redis?: RedisConfig;
  secuirity?: AuthenticationConfig;
  mail?: MailConfig;
  account?: AccountConfig;
}
