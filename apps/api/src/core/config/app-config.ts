import { Injectable } from '@nestjs/common';
import config from 'config';

import { JwtAuthConfig, PostgresConfig, RedisConfig } from './types';
const DEFAULT_DB_CONNECTION_MAX_ATTEMPTS = 3;
const DEFAULT_NESTJS_PORT = 5000;

@Injectable()
export class AppConfig {
  get envPrefix(): string {
    return config.get('envPrefix');
  }

  get isProduction(): boolean {
    return this.envPrefix === 'production';
  }

  get postgresUrl(): string {
    const { dbname, host, port, password, user } = this.postgres;

    const uri = `postgresql://${user}:${password}@${host}:${port}/${dbname}?schema=public`;

    if (this.envPrefix !== 'test') {
      console.log(uri);
    }
    return uri;
  }

  get postgres(): Required<PostgresConfig> {
    const postgres: Partial<PostgresConfig> = config.has('postgres') ? config.get('postgres') : {};

    return {
      host: (postgres.host ?? process.env.POSTGRES_HOST) as string,
      port: (postgres.port ?? process.env.POSTGRES_PORT) as number,
      dbname: (postgres.dbname ?? process.env.POSTGRES_DB) as string,
      user: (postgres.user ?? process.env.POSTGRES_USER) as string,
      password: (postgres.password ?? process.env.POSTGRES_PASSWORD) as string,
      dbConnectionMaxAttempts: postgres.dbConnectionMaxAttempts ?? DEFAULT_DB_CONNECTION_MAX_ATTEMPTS,
    };
  }

  get redisUrl(): string {
    const { host, port } = this.redis;

    const uri = `postgresql://${host}:${port}`;

    if (this.envPrefix !== 'test') {
      console.log(uri);
    }
    return uri;
  }

  get redis(): Required<RedisConfig> {
    const redis: Partial<RedisConfig> = config.has('redis') ? config.get('redis') : {};

    return {
      host: (redis.host ?? process.env.POSTGRES_HOST) as string,
      port: (redis.port ?? process.env.POSTGRES_PORT) as number,
    };
  }

  get jwt(): Required<JwtAuthConfig> {
    const jwt: Partial<JwtAuthConfig> = config.has('jwt') ? config.get('jwt') : {};

    return {
      accessSecret: (jwt.accessSecret ?? process.env.JWT_ACCESS_SECRET) as string,
      accessExpiresIn: (jwt.accessExpiresIn ?? process.env.JWT_ACCESS_EXPIRES_IN) as string,
      refreshSecret: (jwt.refreshSecret ?? process.env.JWT_REFRESH_SECRET) as string,
      refreshExpiresIn: (jwt.refreshExpiresIn ?? process.env.JWT_REFRESH_EXPIRES_IN) as string,
    };
  }

  static get nestApiGlobalPrefix(): string {
    return '/api/v1';
  }

  get nestPort(): number {
    return config.get('nestPort') || DEFAULT_NESTJS_PORT;
  }
}
