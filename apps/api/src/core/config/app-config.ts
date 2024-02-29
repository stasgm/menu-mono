import { Injectable, Logger } from '@nestjs/common';
import config from 'config';

import { AccountConfig, AuthenticationConfig, JwtAuthConfig, MailConfig, PostgresConfig, RedisConfig } from './types';

const DEFAULT_DB_CONNECTION_MAX_ATTEMPTS = 3;
const DEFAULT_NESTJS_PORT = 5000;
const ACCOUNT_ACTIVATION_MAX_NUMBER_OF_ATTEMPTS = 3;

// TODO make params validation. Throw error if not valid

@Injectable()
export class AppConfig {
  private readonly logger = new Logger('AppConfig');

  static get nestApiGlobalPrefix(): string {
    return '/api/v1';
  }

  get nestPort(): number {
    return config.get<number>('nestPort') || DEFAULT_NESTJS_PORT;
  }

  get envPrefix(): string {
    return config.get<string>('envPrefix');
  }

  get isProduction(): boolean {
    return this.envPrefix === 'production';
  }

  get postgresUrl(): string {
    const { dbname, host, port, password, user } = this.postgres;

    const uri = `postgresql://${user}:${password}@${host}:${port}/${dbname}?schema=public`;

    if (this.envPrefix !== 'test' && !this.isProduction) {
      this.logger.debug(uri);
    }

    return uri;
  }

  get postgres(): Required<PostgresConfig> {
    const postgres: Partial<PostgresConfig> = config.has('postgres') ? config.get('postgres') : {};

    // TODO should throw an error when jwt host, port, db, user and password are not set

    return {
      host: postgres.host ?? process.env.POSTGRES_HOST ?? 'localhost',
      port: (postgres.port ?? process.env.POSTGRES_PORT) as number,
      dbname: postgres.dbname ?? process.env.POSTGRES_DB ?? '',
      user: postgres.user ?? process.env.POSTGRES_USER ?? '',
      password: postgres.password ?? process.env.POSTGRES_PASSWORD ?? '',
      dbConnectionMaxAttempts: postgres.dbConnectionMaxAttempts ?? DEFAULT_DB_CONNECTION_MAX_ATTEMPTS,
    };
  }

  get redisUrl(): string {
    const { host, port } = this.redis;

    const uri = `redis://${host}:${port}`;

    if (this.envPrefix !== 'test' && !this.isProduction) {
      this.logger.debug(uri);
    }

    return uri;
  }

  get redis(): Required<RedisConfig> {
    const redis = config.has('redis') ? config.get<Partial<RedisConfig>>('redis') : {};

    return {
      host: redis.host ?? process.env.POSTGRES_HOST ?? 'localhost',
      port: redis.port ?? (process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 6379),
    };
  }

  get jwt(): Required<JwtAuthConfig> {
    const secuirity = config.has('secuirity') ? config.get<Partial<AuthenticationConfig>>('secuirity') : {};

    // TODO should throw an error when jwt is not set

    return {
      access: {
        secret: secuirity?.jwt?.access.secret ?? process.env.JWT_ACCESS_SECRET ?? '',
        expiresIn: secuirity?.jwt?.access.expiresIn ?? process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
      },
      refresh: {
        secret: secuirity?.jwt?.refresh.secret ?? process.env.JWT_REFRESH_SECRET ?? '',
        expiresIn: secuirity?.jwt?.refresh.expiresIn ?? process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
      },
      activate: {
        secret: secuirity?.jwt?.activate.secret ?? process.env.JWT_ACCESS_SECRET ?? '',
        expiresIn: secuirity?.jwt?.activate.expiresIn ?? process.env.JWT_ACCESS_EXPIRES_IN ?? '1d',
      },
      resetPass: {
        secret: secuirity?.jwt?.resetPass.secret ?? process.env.JWT_ACCESS_SECRET ?? '',
        expiresIn: secuirity?.jwt?.resetPass.expiresIn ?? process.env.JWT_ACCESS_EXPIRES_IN ?? '1d',
      },
    };
  }

  get account(): Required<AccountConfig> {
    const account = config.has('account') ? config.get<Partial<AccountConfig>>('account') : {};

    return {
      codeAcivationMaxNumberOfAttempts:
        account?.codeAcivationMaxNumberOfAttempts ??
        (process.env.ACCOUNT_ACTIVATION_MAX_NUMBER_OF_ATTEMPTS
          ? +process.env.ACCOUNT_ACTIVATION_MAX_NUMBER_OF_ATTEMPTS
          : ACCOUNT_ACTIVATION_MAX_NUMBER_OF_ATTEMPTS),
    };
  }

  get bullmq() {
    return {
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
      },
    };
  }

  get mail() {
    // TODO should throw an error when googleApi is not set
    const mail = config.has('mail') ? config.get<Partial<MailConfig>>('mail') : {};

    const { googleApi, mockMailing, transport } = mail;

    return {
      mockMailing: mockMailing ?? process.env.MOCK_MAILING === 'true',
      transport: transport ?? 'smtps://username:password@smtp.example.com',
      googleApi: {
        clientId: googleApi?.clientId ?? process.env.GOOGLE_API_CLIENT_ID ?? '',
        clientSecret: googleApi?.clientSecret ?? process.env.GOOGLE_API_CLIENT_SECRET ?? '',
        refreshToken: googleApi?.refreshToken ?? process.env.GOOGLE_API_REFRESH_TOKEN ?? '',
        apiEmail: googleApi?.apiEmail ?? process.env.GOOGLE_API_EMAIL ?? '',
      },
    };
  }
}
