import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
// import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class PasswordService {
  // get bcryptSaltRounds(): string | number {
  //   const saltOrRounds = this.appConfig.jwt.bcryptSaltOrRound;

  //   return Number.isInteger(Number(saltOrRounds)) ? Number(saltOrRounds) : saltOrRounds;
  // }

  // constructor(private appConfig: AppConfig) {}

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
    // return hash(password, this.bcryptSaltRounds);
  }
}
